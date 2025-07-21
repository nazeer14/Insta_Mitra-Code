import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, View } from 'react-native';

import HomeScreen from '~/screens/HomeScreen';
import LoginScreen from '~/screens/LoginScreen';
import SignupForm from '~/screens/RegisterScreen';
import NotFoundScreen from '~/screens/NotFoundScreen';
import { useAuthStore } from '~/store/useAuthStore';
import BottomTabBar from './BottomTab';
import { RootStackParamList } from './types';
import BookingScreen from '~/screens/BookingsScreen';
import ChatScreen from '~/screens/ChatScreen';
import AccountScren from '~/screens/AccountScreen';
import HomeServices from '~/components/ServicesComponets/HomeServices';
import Services from '~/components/Services';
import ProfileScreen from '~/components/AccountComponents/ProfileScreen';
import OrdersScreen from '~/components/AccountComponents/OrdersSrceen';
import InviteEarnScreen from '~/components/AccountComponents/InviteEarnSrceen';
import RateAppScreen from '~/components/AccountComponents/RateTheAppSrceen';
import CustomerSupportScreen from '~/components/AccountComponents/CustomerSupportSrceen';
import FeedbackScreen from '~/components/AccountComponents/FeedbackSrceen';
import AboutUsScreen from '~/components/AccountComponents/AboutUsSrceen';
import SettingsScreen from '~/components/AccountComponents/SettingsSrceen';
import BackHeader from '~/utils/BackHeader';

const Stack = createNativeStackNavigator<RootStackParamList>();

const linking = {
  prefixes: ['myapp://'],
  config: {
    screens: {
      Login: 'Login',
      Home: 'Home',
      SignUp: 'SignUp',
      Forgot: 'Forgot',
      HomeService: 'HomeService',
      services: 'services',
      NotFound: '*',
    },
  },
};
const RootNavigation = () => {
  const { logout, user } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const isAuthenticated = true;//For testing only
  useEffect(() => {
    console.log(isAuthenticated)
    console.log(user)
    const checkLogin = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      // if (!storedToken) {
      //   logout();
      // }
      setLoading(false);
    };
    checkLogin();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" />
      </View>
    );
  }
  const getHeaderWithTitle = (title: string) => ({
    header: () => <BackHeader title={title} />
  });

  return (
    <NavigationContainer linking={linking}>
        <Stack.Navigator>
          {!isAuthenticated ? (
            <>
              <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
              <Stack.Screen name="SignUp" component={SignupForm} options={{headerShown:false}}/>
            </>
          ) : (
            <>
              <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
              <Stack.Screen name='bookings' component={BookingScreen} options={{headerShown:false}}/>
              <Stack.Screen name='chat' component={ChatScreen} options={{headerShown:false}}/>
              <Stack.Screen name='account' component={AccountScren} options={{headerShown:false}}/>
              <Stack.Screen name='services' component={Services} />
              <Stack.Screen name="Profile" component={ProfileScreen} />
              <Stack.Screen name="Orders" component={OrdersScreen}/>
              <Stack.Screen name="InviteEarn" component={InviteEarnScreen}/>
              <Stack.Screen name="RateApp" component={RateAppScreen}  />
              <Stack.Screen name="CustomerSupport" component={CustomerSupportScreen}  />
              <Stack.Screen name="Feedback" component={FeedbackScreen} />
              <Stack.Screen name="AboutUs" component={AboutUsScreen} />
              <Stack.Screen name="Settings" component={SettingsScreen}/>

            </>
          )}
          <Stack.Screen name="NotFound" component={NotFoundScreen} />
        </Stack.Navigator>
        {isAuthenticated && <BottomTabBar />}
    </NavigationContainer>
  );
};
export default RootNavigation;
