import React, { useRef, useState, useEffect, use } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';
import { sendOtp, verifyOtp } from '~/services/authServices';
import { RootStackParamList } from '~/navigations/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAuthStore } from '~/store/useAuthStore';
import { startUserSession } from '~/services/userSessionService';
import * as Device from 'expo-device';
import * as Location from 'expo-location';
import * as SecureStore from 'expo-secure-store';

const OTP_LENGTH = 6;
const RESEND_TIMEOUT = 60;

type Props = NativeStackScreenProps<RootStackParamList, 'Validation'>

const ValidationScreen = ({ navigation, route }: Props) => {
  const { phoneNumber } = route.params;
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const otpRefs = useRef<TextInput[]>([]);
  const [timer, setTimer] = useState(RESEND_TIMEOUT);
  const [loading, setLoading] = useState(false);
  const { setAuth, isAuthenticated } = useAuthStore();

  const handleChange = (text: string, index: number) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = text;
    setOtp(updatedOtp);

    if (text && index < OTP_LENGTH - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleResend = async () => {
    setTimer(RESEND_TIMEOUT);
    try {
      await sendOtp(phoneNumber);
      Toast.show({
        type: 'success',
        text1: 'OTP resent successfully',
      });
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Failed to resend OTP',
        text2: error?.response?.data?.message || 'Network error',
      });
    }
  };


  const handleSubmit = async () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== OTP_LENGTH) {
      Toast.show({
        type: 'error',
        text1: 'Please enter complete OTP',
      });
      return;
    }

    setLoading(true);
    try {
      const res = await verifyOtp({ phoneNumber, otp: enteredOtp });
      await SecureStore.setItemAsync('accessToken', res.accessToken);
      await SecureStore.setItemAsync('refreshToken', res.refreshToken);
      await SecureStore.setItemAsync('user', JSON.stringify(res.user));
      setAuth(res.accessToken, res.refreshToken, res.user);
      if (!isAuthenticated) {
        throw new Error("Authentication failed");
      }
      // ✅ 1. Get User ID from store
      const user = await SecureStore.getItemAsync('user');
      const parsedUser = user ? JSON.parse(user) : null;
      if (!parsedUser?.id) throw new Error("User not found");

      // ✅ 2. Get Location
      const { status } = await Location.requestForegroundPermissionsAsync();
      let locationString = 'Permission denied';
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        locationString = `${location.coords.latitude},${location.coords.longitude}`;
      }

      // ✅ 3. Get Device Info
      const deviceId = Device.modelName || 'Unknown';
      const appVersion = Device.osVersion || 'Unknown';

      // ✅ 4. Start Session
      await startUserSession(parsedUser?.id, locationString, deviceId, appVersion);

      Toast.show({
        type: 'success',
        text1: 'OTP Verified! Welcome!',
      });

      navigation.reset({
        index: 0,
        routes: [{ name: 'MainTabs' }],
      });

    } catch (err: any) {
      Toast.show({
        type: 'error',
        text1: 'Invalid OTP',
        text2: err?.response?.data?.message || err.message || 'Verification failed',
      });
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimer = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Toast />
      <Text style={styles.title}>Verify OTP</Text>
      <Text style={styles.subtitle}>
        Enter the 6-digit code sent to {'\n'}
        <Text style={styles.phone}>{phoneNumber}</Text>
      </Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, i) => (
          <TextInput
            key={i}
            ref={(ref) => {
              otpRefs.current[i] = ref!;
            }}
            style={styles.otpInput}
            value={otp[i]}
            onChangeText={(text) => handleChange(text.replace(/[^0-9]/g, ''), i)}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === 'Backspace' && otp[i] === '' && i > 0) {
                otpRefs.current[i - 1]?.focus();
              }
            }}
            keyboardType="number-pad"
            maxLength={1}
            returnKeyType="done"
          />

        ))}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#2563eb" style={{ marginTop: 20 }} />
      ) : (
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Ionicons name="checkmark-done" size={20} color="#fff" />
          <Text style={styles.submitText}>Verify OTP</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.timerText}>
        {timer > 0 ? `Resend in ${formatTimer()}` : ''}
      </Text>

      <TouchableOpacity
        disabled={timer > 0}
        onPress={handleResend}
        style={[
          styles.resendButton,
          { opacity: timer > 0 ? 0.5 : 1 },
        ]}
      >
        <Text style={styles.resendText}>Resend OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ValidationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 10,
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 30,
  },
  phone: {
    color: '#111827',
    fontWeight: '600',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    paddingHorizontal: 10,
  },
  otpInput: {
    width: 45,
    height: 55,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#cbd5e1',
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: '#fff',
    fontWeight: '600',
  },
  submitButton: {
    flexDirection: 'row',
    marginTop: 30,
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resendButton: {
    marginTop: 20,
    alignSelf: 'center',
  },
  resendText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#2563eb',
  },
  timerText: {
    marginTop: 10,
    textAlign: 'center',
    color: '#6b7280',
    fontSize: 14,
  },
});
