import React from 'react';
import {
  Pressable,
  Text,
  GestureResponderEvent,
  StyleSheet,
  ImageBackground,
  View,
} from 'react-native';

type FancyButtonProps = {
  title?: string;
  onPress: (event: GestureResponderEvent) => void;
  className?: string;
  image?: any; // local image (require) or URL
};

export default function FancyButton({
  title = 'Click Me',
  onPress,
  className,
  image,
}: FancyButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [pressed && styles.pressed]}
      className={`overflow-hidden rounded-xl h-[20%] shadow-md border-2 border-violet-600 ${className ?? ''}`}
    >
      <ImageBackground
        source={image}
        resizeMode="cover"
        className="w-fit h-full items-center justify-center"
      >
        <View className="bg-black/50 px-6 py-2 rounded-md">
          <Text className="font-semibold text-2xl text-white">{title}</Text>
        </View>
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
});
