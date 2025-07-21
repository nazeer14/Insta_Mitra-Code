import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import BackHeader from '../../utils/BackHeader';

const AboutUsScreen = () => {
  return (
    <ScrollView  className="flex-1 bg-white px-4 py-6">
      <Text className="text-2xl font-semibold mb-4">About Us</Text>
      <Text className="text-gray-700 text-3xl">
        QuickServ is a leading on-demand home service platform that connects customers with trusted workers for all your needs — from cleaning to repairs and more. We aim to make everyday living easier.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi fugit amet reprehenderit itaque laboriosam. Dolorem corporis molestiae, facilis iusto, placeat nisi maiores nihil odio exercitationem rem libero consequuntur, quis laboriosam.
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus vitae a natus veniam eligendi exercitationem laborum quia magnam, aperiam in impedit provident nesciunt placeat dicta sunt nobis deserunt nisi ex.  
      </Text>
    </ScrollView>
  );
};

export default AboutUsScreen;
