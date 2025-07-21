import React from 'react';
import { View, Text, Button, Share } from 'react-native';

const InviteEarnScreen = () => {
  const handleShare = async () => {
    await Share.share({
      message: 'Join QuickServ! Get ₹100 off on your first booking. https://quickserv.app/invite-code',
    });
  };

  return (
    <View className="flex-1 bg-white px-4 py-6">
      <Text className="text-xl font-semibold mb-4">Invite & Earn</Text>
      <Text className="mb-4 text-gray-700">
        Invite your friends and earn ₹100 when they complete their first service.
      </Text>
      <Button title="Share Invite Code" onPress={handleShare} />
    </View>
  );
};

export default InviteEarnScreen;
