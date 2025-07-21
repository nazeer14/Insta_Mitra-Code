import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { BookingData } from '~/services/bookingsServices';

interface Props {
  visible: boolean;
  booking: BookingData | null;
  onClose: () => void;
}

const BookingModal: React.FC<Props> = ({ visible, booking, onClose }) => {
  if (!booking) return null;

  return (
    <Modal isVisible={visible} onBackdropPress={onClose}>
      <View className="bg-white rounded-lg p-6">
        <Text className="text-xl font-bold text-purple-700 mb-2">
          {booking.serviceName}
        </Text>
        <Text className="text-gray-700">📍 {booking.address}</Text>
        <Text className="text-gray-700">🕒 {booking.timeSlot}</Text>
        <Text className="text-gray-700">💰 ₹ {booking.finalPrice}</Text>
        <Text className="text-gray-700">📅 {booking.serviceDate}</Text>
        <Text className="text-gray-700 mt-2">📝 {booking.review || 'No review yet.'}</Text>
        <TouchableOpacity
          className="mt-4 bg-purple-700 rounded-md py-2"
          onPress={onClose}
        >
          <Text className="text-white text-center">Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default BookingModal;
