import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import React from 'react'
import { Platform, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native'

type BackHeaderProps = {
  title: string;
};
const BackHeader = ( { title}: BackHeaderProps ) => {
  const navigation=useNavigation();
  return (
    <ScrollView >
    <View className="h-18 fixed flex-row bg-white items-center px-4 pt-0"
  style={{
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  }}
>
    <TouchableOpacity onPress={()=>navigation.goBack()} className='pr-4'>
      <Feather name="arrow-left" size={26} />
    </TouchableOpacity>
    <Text className='text-2xl font-bold'>{title}</Text>
    </View>
    </ScrollView>
  )
}

export default BackHeader