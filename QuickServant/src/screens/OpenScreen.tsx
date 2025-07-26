import React, { useEffect } from 'react';
import { View, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '~/store/useAuthStore';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '~/navigations/types';

const OpenScreen = () => {
  type NavigationProp = NativeStackNavigationProp<RootStackParamList>
  const navigation = useNavigation<NavigationProp>();
  const {isAuthenticated} = useAuthStore();

  useEffect(() => {
    const validateUser = async () => {
      navigation.reset({
        index: 0,
        routes: [{ name: isAuthenticated ? 'MainTabs' : 'Login' }],
      });
    };

    validateUser();
  }, []);

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff',
    }}>
      <Image
        source={require('../../assets/logo.png')}
        style={{ width: 100, height: 100, marginBottom: 30 }}
        resizeMode="contain"
      />
      <ActivityIndicator size="large" color="#2563eb" />
    </View>
  );
};

export default OpenScreen;
