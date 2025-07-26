// screens/LoginScreen.tsx
import React from 'react';
import {
  View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '~/navigations/types';
import { sendOtp } from '~/services/authServices';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

interface FormData {
  phoneNumber: string;
}

const LoginScreen = ({ navigation }: Props) => {
  const { control, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
  const phoneNumber = watch('phoneNumber');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSendOtp = async ({ phoneNumber }: FormData) => {
    setLoading(true);
    try {
      await sendOtp(phoneNumber);
      navigation.navigate('Validation', { phoneNumber });
    } catch (e: any) {
      setError(e.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-white px-6 justify-center"
    >
      <View className="gap-6">
        <Text className="text-3xl font-bold text-center text-black">Login with OTP</Text>

        <Controller
          control={control}
          name="phoneNumber"
          rules={{
            required: 'Phone number is required',
            pattern: {
              value: /^[6-9]\d{9}$/,
              message: 'Enter a valid 10-digit Indian number',
            },
          }}
          render={({ field: { onChange, value } }) => (
            <>
              <Text className="text-lg text-gray-700 mb-1">Mobile Number</Text>
              <View className="flex-row items-center border border-gray-300 rounded-xl px-4 py-3 bg-gray-50">
                <Text className="text-lg mr-2 text-gray-600">+91</Text>
                <TextInput
                  className="flex-1 text-lg"
                  keyboardType="number-pad"
                  maxLength={10}
                  value={value}
                  onChangeText={onChange}
                />
              </View>
              {errors.phoneNumber && (
                <Text className="text-red-500 mt-1">{errors.phoneNumber.message}</Text>
              )}
            </>
          )}
        />

        {error && <Text className="text-red-500 text-center">{error}</Text>}

        <TouchableOpacity
          disabled={loading || !/^[6-9]\d{9}$/.test(phoneNumber)}
          onPress={handleSubmit(handleSendOtp)}
          className={`bg-blue-600 py-3 rounded-xl items-center ${phoneNumber?.length === 10 ? 'opacity-100' : 'opacity-50'}`}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white text-lg font-semibold">Send OTP</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
