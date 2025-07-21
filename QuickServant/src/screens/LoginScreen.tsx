import React, { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  ImageBackground,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LinearGradient } from 'expo-linear-gradient';
import { Feather, Ionicons } from '@expo/vector-icons';

import { RootStackParamList } from '~/navigations/types';
import { LoginPayload, LoginUser } from '../services/authServices';
import { useAuthStore } from '~/store/useAuthStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [error, setError] = useState('');
  const { setAuth } = useAuthStore();

  const LoginSchema = Yup.object().shape({
    mobileno: Yup.string()
      .matches(/^[0-9]{10,13}$/, 'Enter a valid mobile number')
      .required('Mobile number is required'),
    password: Yup.string()
      .min(6, 'Minimum 6 characters')
      .required('Password is required'),
  });

  const handleLogin = async (values: LoginPayload, actions: any) => {
    try {
      const res = await LoginUser(values);
      await AsyncStorage.setItem('token', res.token);
      await AsyncStorage.setItem('user', JSON.stringify(res));
      setAuth(res.token, res);

      actions.resetForm();
      navigation.navigate('Home');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/adaptive-icon.png')} 
      resizeMode="cover"
      className="flex-1"
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.8)']}
        className="flex-1"
      >
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="flex-1">
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            className="px-5 pt-20 pb-10"
          >
            <View className="items-center mb-8">
              <Image
                source={require('../../assets/logo.png')} // Replace with your logo
                style={{ width: 100, height: 100, borderRadius: 20 }}
              />
              <Text className="text-white text-2xl font-bold mt-3">QuickServant</Text>
            </View>

            <View className="bg-white rounded-2xl p-6 shadow-lg">
              <Text className="text-2xl font-bold text-center text-gray-800 mb-1">Welcome Back 👋</Text>
              <Text className="text-center text-gray-500 mb-6">Login to your account</Text>

              <Formik
                initialValues={{ mobileno: '', password: '' }}
                validationSchema={LoginSchema}
                onSubmit={handleLogin}
              >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
                  <>
                    {/* Mobile Input */}
                    <View className="mb-4">
                      <Text className="mb-1 text-gray-700 font-medium">Mobile Number</Text>
                      <LinearGradient colors={['#6a11cb', '#2575fc']} className="rounded-xl p-[1px]">
                        <View className="flex-row items-center bg-white rounded-xl px-4 py-3">
                          <Feather name="phone" size={20} color="#555" className="mr-2" />
                          <TextInput
                            placeholder="Enter mobile number"
                            keyboardType="phone-pad"
                            value={values.mobileno}
                            onChangeText={handleChange('mobileno')}
                            onBlur={handleBlur('mobileno')}
                            className="flex-1 text-gray-800 text-base"
                            placeholderTextColor="#aaa"
                          />
                        </View>
                      </LinearGradient>
                      {touched.mobileno && errors.mobileno && (
                        <Text className="text-red-500 text-sm mt-1">{errors.mobileno}</Text>
                      )}
                    </View>

                    {/* Password Input */}
                    <View className="mb-4">
                      <Text className="mb-1 text-gray-700 font-medium">Password</Text>
                      <LinearGradient colors={['#6a11cb', '#2575fc']} className="rounded-xl p-[1px]">
                        <View className="flex-row items-center bg-white rounded-xl px-4 py-3">
                          <Ionicons name="lock-closed-outline" size={20} color="#555" className="mr-2" />
                          <TextInput
                            placeholder="Enter password"
                            secureTextEntry
                            value={values.password}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            className="flex-1 text-gray-800 text-base"
                            placeholderTextColor="#aaa"
                          />
                        </View>
                      </LinearGradient>
                      {touched.password && errors.password && (
                        <Text className="text-red-500 text-sm mt-1">{errors.password}</Text>
                      )}
                    </View>

                    {error !== '' && <Text className="text-red-600 text-sm mb-3">{error}</Text>}

                    {/* Login Button */}
                    <TouchableOpacity
                      onPress={handleSubmit as any}
                      disabled={isSubmitting}
                      className="bg-blue-600 rounded-xl py-4 mt-2 items-center"
                    >
                      {isSubmitting ? (
                        <ActivityIndicator color="#fff" />
                      ) : (
                        <Text className="text-white text-base font-semibold">Login</Text>
                      )}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
                      <Text className="text-right text-blue-500 mt-3 font-medium">Forgot Password?</Text>
                    </TouchableOpacity>

                    <View className="border-b border-gray-200 my-6" />

                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                      <Text className="text-center text-gray-600">
                        Don’t have an account?{' '}
                        <Text className="text-blue-600 font-semibold">Register</Text>
                      </Text>
                    </TouchableOpacity>
                  </>
                )}
              </Formik>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </ImageBackground>
  );
}
