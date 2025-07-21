import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Home, CalendarCheck, User, MessageCircle, Navigation } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const tabs = [
  { name: 'Home', icon: Home, path: 'Home' },
  { name: 'Bookings', icon: CalendarCheck, path: 'bookings' },
  { name: 'Chat', icon: MessageCircle, path: 'chat' },
  { name: 'Account', icon: User, path: 'account' },
];

export default function BottomTabBar() {
  const navigation=useNavigation();
  return (
    <View className="flex-row justify-around bg-white py-2 shadow-md border-t border-gray-200">
      {tabs.map((tab, index) => {
        const IconComponent = tab.icon;
        return (
          <TouchableOpacity
            key={index}
            className="items-center"
            onPress={() => navigation.navigate(tab.path as never)}
          >
            <IconComponent size={24} color="#333" />
            <Text className="text-xs mt-1 text-gray-600">{tab.name}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
