import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const OTP_LENGTH = 6;
const RESEND_TIMEOUT = 120; // seconds

export default function OtpVerificationScreen({ route }) {
  const { phoneNumber } = route.params;
  const navigation = useNavigation();

  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const [timer, setTimer] = useState(RESEND_TIMEOUT);
  const [error, setError] = useState('');
  const inputRefs = useRef([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (value: string, index: number) => {
    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < OTP_LENGTH - 1) {
        inputRefs.current[index + 1]?.focus();
      } else {
        Keyboard.dismiss();
      }
    } else if (value === '') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
    }
  };

  const handleBackspace = (index: number) => {
    if (otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== OTP_LENGTH) {
      setError('Please enter a valid OTP.');
      return;
    }

    // TODO: Replace with real API
    if (enteredOtp === '123456') {
      navigation.navigate('HomeScreen');
    } else {
      setError('Invalid OTP. Please try again.');
    }
  };

  const handleResendOtp = () => {
    // TODO: Trigger resend OTP API
    setOtp(Array(OTP_LENGTH).fill(''));
    setTimer(RESEND_TIMEOUT);
    setError('');
  };

  const handleChangeNumber = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardShouldPersistTaps="handled"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 justify-center px-6 py-10">
            <Text className="text-3xl font-bold text-center text-gray-900 mb-4">
              OTP Verification
            </Text>
            <Text className="text-lg text-center text-gray-600 mb-6">
              Enter the 6-digit code sent to
            </Text>
            <Text className="text-lg text-center font-semibold text-black mb-6">
              {phoneNumber}
            </Text>

            <View className="flex-row justify-between mx-auto w-[90%] mb-4">
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => {  inputRefs.current[index] = ref;}}
                  value={digit}
                  onChangeText={(value) => handleChange(value, index)}
                  onKeyPress={({ nativeEvent }) => {
                    if (nativeEvent.key === 'Backspace') {
                      handleBackspace(index);
                    }
                  }}
                  keyboardType="numeric"
                  maxLength={1}
                  className="w-12 h-14 border-2 border-gray-400 rounded-xl text-center text-2xl font-semibold text-black bg-white"
                />
              ))}
            </View>

            {error !== '' && (
              <Text className="text-red-600 text-center mb-4 text-base">{error}</Text>
            )}

            <TouchableOpacity
              onPress={handleVerify}
              className="bg-blue-600 py-4 rounded-xl mt-4"
            >
              <Text className="text-white text-center text-xl font-bold">Verify OTP</Text>
            </TouchableOpacity>

            <Text className="text-center text-base mt-6 text-gray-600">
              {timer > 0 ? `Resend OTP in ${timer}s` : ''}
            </Text>

            {timer === 0 && (
              <TouchableOpacity onPress={handleResendOtp}>
                <Text className="text-center text-blue-600 text-base font-semibold mt-2">
                  Resend OTP
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity onPress={handleChangeNumber}>
              <Text className="text-center text-blue-500 mt-6 font-medium text-base">
                Change Mobile Number
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
