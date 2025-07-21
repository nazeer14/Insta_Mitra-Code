import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Badge } from 'react-native-paper';
import { BookingData } from '~/services/bookingsServices';
import { format } from 'date-fns';

interface Props {
  item: BookingData;
  onPress: (booking: BookingData) => void;
  onCancel: (id: number) => void;
}

import { Swipeable } from 'react-native-gesture-handler';

const BookingCard: React.FC<Props> = ({ item, onPress, onCancel }) => {
  const renderRightActions = () => (
    <TouchableOpacity
      className="bg-red-500 justify-center items-center px-6"
      onPress={() => onCancel(item.id)}
    >
      <Text className="text-white font-semibold">Cancel</Text>
    </TouchableOpacity>
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity
        onPress={() => onPress(item)}
        className="bg-white rounded-xl shadow-md p-4 mb-4 mx-3"
      >
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-lg font-semibold text-purple-700">{item.serviceName}</Text>
          <Badge
            style={{
              backgroundColor:
                item.BookingStatus === 'ACTIVE'
                  ? '#34d399'
                  : item.BookingStatus === 'IN_PROGRESS'
                  ? '#facc15'
                  : '#d1d5db',
              color: '#111827',
            }}
          >
            {item.BookingStatus.replace('_', ' ')}
          </Badge>
        </View>

        <Text className="text-gray-600 mb-1">📍 {item.address}</Text>
        <Text className="text-gray-600 mb-1">
          🗓️ {format(new Date(item.serviceDate), 'dd MMM yyyy')}
        </Text>
        <Text className="text-gray-600 mb-1">🕒 {item.timeSlot}</Text>
        <Text className="text-purple-700 font-bold mt-1">₹ {item.finalPrice}</Text>
      </TouchableOpacity>
    </Swipeable>
  );
};

export default BookingCard;
