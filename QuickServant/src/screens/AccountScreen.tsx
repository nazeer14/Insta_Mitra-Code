import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import {LinearGradient } from 'expo-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '~/navigations/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthStore } from '~/store/useAuthStore'

type Props=NativeStackScreenProps<RootStackParamList,'account'>;

const AccountScreen = ({navigation}:Props) => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const { logout }=useAuthStore();
  useEffect(() => {
    // Simulate fetch delay
    setTimeout(() => {
      setUserData({
        name: 'Nazeer Shaik',
        email: 'nazeer@example.com',
        image: 'https://i.pravatar.cc/300',
      });
      setLoading(false);
    }, 1000);
  }, []);

  const handleLogout=async()=>{
   try {
    await AsyncStorage.clear(); 
    logout();                   
    navigation.reset({         
      index: 0,
      routes: [{ name: 'Login' }],
    });
  } catch (error) {
    Alert.alert("Logout Error", "Something went wrong while logging out.");
  }
  }

  return (
    <ScrollView className="flex-1 bg-white px-4 py-6">
      {/* Profile Section */}
      <View className="items-center mb-6">
          <ShimmerPlaceholder
          visible={!loading}
          LinearGradient={LinearGradient}
          shimmerStyle={{ borderRadius: 8, width: 160, height: 20, marginBottom: 6 }}
        >
          <Image
            source={{ uri: userData?.image }}
            className="w-24 h-24 rounded-full mb-3"
          />
        </ShimmerPlaceholder>

        <ShimmerPlaceholder
          visible={!loading}
          LinearGradient={LinearGradient}
          shimmerStyle={{ borderRadius: 8, width: 160, height: 20, marginBottom: 6 }}
        >
          <Text className="text-xl font-semibold text-indigo-800">{userData?.name}</Text>
        </ShimmerPlaceholder>

        <ShimmerPlaceholder
          visible={!loading}
          LinearGradient={LinearGradient}
          shimmerStyle={{ borderRadius: 6, width: 180, height: 16 }}
        >
          <Text className="text-sm text-gray-500">{userData?.email}</Text>
        </ShimmerPlaceholder>
      </View>

      {/* Account Items */}
      {!loading && (
        <View className="space-y-3 gap-1">
          <AccountItem icon="user" label="Profile" onPress={()=>navigation.navigate('Profile')}/>
          <AccountItem icon="shopping-bag" label="My Orders" onPress={()=>navigation.navigate('Orders')}/>
          <AccountItem icon="gift" label="Invite & Earn" onPress={()=>navigation.navigate('InviteEarn')}/>
          <AccountItem icon="star" label="Rate the App" onPress={()=>navigation.navigate('RateApp')}/>
          <AccountItem icon="headphones" label="Customer Support" onPress={()=>navigation.navigate('CustomerSupport')}/>
          <AccountItem icon="message-square" label="Feedback" onPress={()=>navigation.navigate('Feedback')}/>
          <AccountItem icon="info" label="About Us" onPress={()=>navigation.navigate('AboutUs')}/>
          <AccountItem icon="settings" label="Settings" onPress={()=>navigation.navigate('Settings')}/>
          <AccountItem icon="log-out" label="Logout" onPress={()=>handleLogout()} />
        </View>
      )}
    </ScrollView>
  );
};

const AccountItem = ({
  icon,
  label,
  onPress = () => {},
}: {
  icon: string;
  label: string;
  onPress?: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex-row items-center justify-between bg-gray-100 rounded-md px-4 py-3 border "
  >
    <View className="flex-row items-center space-x-5 gap-2">
      <Feather name={icon as any} size={22} color="#4B5563" />
      <Text className="text-xl text-gray-800">{label}</Text>
    </View>
    <MaterialIcons name="chevron-right" size={22} color="#9CA3AF" />
  </TouchableOpacity>
);

export default AccountScreen;
