import React from 'react';
import { View, Text, Switch } from 'react-native';
import { useState } from 'react';

const SettingsScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <View className="flex-1 bg-white px-4 py-6">
      <Text className="text-xl font-semibold mb-4">Settings</Text>
      <View className="flex-row justify-between items-center py-2">
        <Text className="text-base text-gray-700">Enable Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
        />
      </View>
    </View>
  );
};

export default SettingsScreen;
