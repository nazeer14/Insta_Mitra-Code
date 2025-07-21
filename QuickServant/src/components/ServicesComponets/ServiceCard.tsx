// components/ServiceCard.tsx
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

type Props = {
  name: string;
  onPress?:()=>void ;
};

const ServiceCard: React.FC<Props> = ({ name, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-blue-100 rounded-xl p-4 mb-3"
    >
      <Text className="text-blue-900 font-semibold text-lg">{name}</Text>
    </TouchableOpacity>
  );
};

export default ServiceCard;
