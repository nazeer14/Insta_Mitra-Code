import React from 'react';
import { View, Text, ScrollView } from 'react-native';

const OrdersScreen = () => {
  return (
    <ScrollView className="flex-1 bg-white px-4 py-6">
      <Text className="text-2xl font-semibold mb-4">My Orders</Text>
      {/* You can map orders here */}
      <View className="bg-gray-100 p-4 rounded-md mb-3">
        <Text className="text-lg text-gray-700">Cleaning Service</Text>
        <Text className="text-sm text-gray-500">Date: 20 July 2025</Text>
        <Text className="text-sm text-gray-500">Status: Completed</Text>
      </View>
    </ScrollView>
  );
};

export default OrdersScreen;
