import React from 'react';
import { View, Text, Button, Linking } from 'react-native';

const RateAppScreen = () => {
  const handleRate = () => {
    Linking.openURL('https://play.google.com/store/apps/details?id=com.quickserv.app');
  };

  return (
    <View className="flex-1 bg-white px-4 py-6">
      <Text className="text-xl font-semibold mb-4">Rate the App</Text>
      <Text className="mb-4 text-gray-700">Love using QuickServ? Let others know!</Text>
      <Button title="Rate on Play Store" onPress={handleRate} />
    </View>
  );
};

export default RateAppScreen;
