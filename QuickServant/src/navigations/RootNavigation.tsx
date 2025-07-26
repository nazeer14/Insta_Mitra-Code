import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, Text, View } from 'react-native';

import LoginScreen from '~/screens/LoginScreen';
import SignupForm from '~/screens/RegisterScreen';
import NotFoundScreen from '~/screens/NotFoundScreen';
import { useAuthStore } from '~/store/useAuthStore';
import MainTabNavigator from './MainTabNavigator';
import { RootStackParamList } from './types';

import Services from '~/components/Services';
import ProfileScreen from '~/components/AccountComponents/ProfileScreen';
import OrdersScreen from '~/components/AccountComponents/OrdersSrceen';
import InviteEarnScreen from '~/components/AccountComponents/InviteEarnSrceen';
import RateAppScreen from '~/components/AccountComponents/RateTheAppSrceen';
import CustomerSupportScreen from '~/components/AccountComponents/CustomerSupportSrceen';
import FeedbackScreen from '~/components/AccountComponents/FeedbackSrceen';
import AboutUsScreen from '~/components/AccountComponents/AboutUsSrceen';
import SettingsScreen from '~/components/AccountComponents/SettingsSrceen';
import ValidationScreen from '~/screens/ValidationScreen';
import OpenScreen from '~/screens/OpenScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const linking = {
  prefixes: ['myapp://'],
  config: {
    screens: {
      Login: 'login',
      SignUp: 'signup',
      Forgot: 'forgot',
      NotFound: '*',

      Root: {
        path: 'root',
        screens: {
          Home: 'Home',
          Bookings: 'bookings',
          Chat: 'chat',
          Account: 'account',
        },
      },

      ServiceDetails: 'services/:id', 
    },
  },
};


const RootNavigation = () => {

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName={'Login'} >
        <Stack.Screen name="OpenScreen" component={OpenScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Validation" component={ValidationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MainTabs" component={MainTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignupForm} options={{ headerShown: false }} />

        {/* Other screens */}
        <Stack.Screen name="services" component={Services} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Orders" component={OrdersScreen} />
        <Stack.Screen name="InviteEarn" component={InviteEarnScreen} />
        <Stack.Screen name="RateApp" component={RateAppScreen} />
        <Stack.Screen name="CustomerSupport" component={CustomerSupportScreen} />
        <Stack.Screen name="Feedback" component={FeedbackScreen} />
        <Stack.Screen name="AboutUs" component={AboutUsScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="NotFound" component={NotFoundScreen} />
      </Stack.Navigator>
      </NavigationContainer>
  );
};


export default RootNavigation;
