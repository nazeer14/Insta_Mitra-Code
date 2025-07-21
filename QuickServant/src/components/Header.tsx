// components/Header.tsx
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Menu } from "lucide-react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

const Header = () => {
  return (
    <Animated.View
      entering={FadeInDown.springify().damping(14)}
      className="flex-row  items-center justify-center px-4 py-2 bg-purple-400 rounded-xl shadow-md"
    >
      {/* Menu Button
      <TouchableOpacity className="p-2">
        <Menu size={24} color="#1e293b" />
      </TouchableOpacity> */}

      {/* Center Logo and Company Name */}
      <View className="flex-row items-center space-x-2 gap-2">
        <Image
          source={require("../../assets/logo.png")} // Use your logo image path
          className="w-10 h-10"
        />
        <Text className="text-2xl font-bold tracking-wide">
          QuickServ
        </Text>
      </View>
    </Animated.View>
  );
};

export default Header;
