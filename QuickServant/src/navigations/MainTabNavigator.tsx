// MainTabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '~/screens/HomeScreen';
import BookingScreen from '~/screens/BookingsScreen';
import ChatScreen from '~/screens/ChatScreen';
import AccountScren from '~/screens/AccountScreen';
import { BottomTabParamList } from './types';


const Tab = createBottomTabNavigator<BottomTabParamList>();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="bookings" component={BookingScreen} />
      <Tab.Screen name="chat" component={ChatScreen} />
      <Tab.Screen name="account" component={AccountScren} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
