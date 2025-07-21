import React from 'react';
import { View, Text, Linking, Button } from 'react-native';

const CustomerSupportScreen = () => {
  const handleCall = () => {
    Linking.openURL('tel:1800123456');
  };

  return (
    <View className="flex-1 bg-white px-4 py-6">
      <Text className="text-xl font-semibold mb-4">Customer Support</Text>
      <Text className="mb-4 text-gray-700">Need help? We're here for you.</Text>
      <Button title="Call Support" onPress={handleCall} />
    </View>
  );
};

export default CustomerSupportScreen;
