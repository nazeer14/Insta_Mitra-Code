import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';

const ProfileScreen = () => {
  return (
    <ScrollView className="flex-1 bg-white px-4 py-6">
      <View className="items-center mb-6">
        <Image
          source={{ uri: 'https://i.pravatar.cc/300' }}
          className="w-24 h-24 rounded-full mb-4"
        />
        <Text className="text-xl font-semibold text-indigo-800">Nazeer Shaik</Text>
        <Text className="text-sm text-gray-500">nazeer@example.com</Text>
      </View>

      <View className="bg-gray-100 p-4 rounded-md">
        <Text className="text-base text-gray-700">Phone: +91 9876543210</Text>
        <Text className="text-base text-gray-700 mt-2">Address: Hyderabad, India</Text>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
