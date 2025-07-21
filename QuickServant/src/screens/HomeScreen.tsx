import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import {  Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '~/components/Header';
import { RootStackParamList } from '~/navigations/types';
import FancyButton from '~/utils/FancyButton';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: Props) => {
  return (
    <SafeAreaView className="flex-1 bg-purple-100">
      <Header/>
      <ScrollView contentContainerStyle={{flexGrow:1}} className="px-4 py-6">
        <View className="items-center mb-6">
          <Text className="text-3xl font-bold text-purple-900 mb-2 text-center">
            👋 Welcome to QuickServant
          </Text>
          <Text className="text-base text-gray-700 text-center">
            Choose a service category below
          </Text>
        </View>
        <View className="flex flex-row flex-wrap justify-between gap-3">
          <FancyButton
            title="Home Services"
             image={{ uri: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cleaning-tool-royalty-free-image-1583340347.jpg?crop=0.600xw:0.898xh;0.400xw' }}
            onPress={() => navigation.navigate('services', { serviceName: 'House' })}
            className="w-[46%]"
          />
          <FancyButton
            title="Beauty Services"
            image={{ uri: 'https://img.freepik.com/premium-photo/makeup-background-beauty-product-color-surface_153977-635.jpg?w=2000' }}
            onPress={() => navigation.navigate('services', { serviceName: 'Beauty' })}
            className="w-[46%] "
          />
          <FancyButton
            title="Electrical Services"
            image={{ uri: 'https://www.colemanelectricalservices.co.uk/wp-content/uploads/2022/11/home-image-2022.jpg' }}
            onPress={() => navigation.navigate('services', { serviceName: 'Electrician' })}
            className="w-[46%]"
          />
          <FancyButton
            title="Mechanic Services"
            image={{ uri: 'https://irp-cdn.multiscreensite.com/36d466aa/dms3rep/multi/desktop/httl-927x612.jpg' }}
            onPress={() => navigation.navigate('services', { serviceName: 'Mechanic' })}
            className='w-[46%]'
          />
           <FancyButton
            title="Cooling Services"
            image={{ uri: 'https://www.leesheatac.com/wp-content/uploads/2020/09/AC-Installation-scaled.jpg' }}
            onPress={() => navigation.navigate('services', { serviceName: 'Cooling' })}
            className='w-[46%]'
          />
          <FancyButton
            title="Plumbing Services"
            image={{ uri: 'https://img.freepik.com/premium-photo/makeup-background-beauty-product-color-surface_153977-635.jpg?w=2000' }}
            onPress={() => navigation.navigate('services', { serviceName: 'Plumbing' })}
            className="w-[46%]"
          />
          <FancyButton
            title="General Services"
            image={{ uri: 'https://img.freepik.com/premium-photo/makeup-background-beauty-product-color-surface_153977-635.jpg?w=2000' }}
            onPress={() => navigation.navigate('services', { serviceName: 'General' })}
            className="w-full"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
