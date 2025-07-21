import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '~/navigations/types';
import { BookingData, activeBookings } from '~/services/bookingsServices';
import { useBookingStore } from '~/store/useBookingStore';
import BookingCard from '~/components/BookingComponents/BookingCard';
import BookingModal from '~/components/BookingComponents/BookingModal';
import io from 'socket.io-client';

type Props = NativeStackScreenProps<RootStackParamList, 'bookings'>;

const SOCKET_URL = 'http://localhost:8080/ws';

const BookingScreen = (props: Props) => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [filteredList, setFilteredList] = useState<BookingData[]>([]);
  const [orders, setOrders] = useState<BookingData[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<BookingData | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const { setBookings , bookings} = useBookingStore();
  const socket = useRef<any>(null);

  // Load bookings
  const loadBookings = useCallback(async () => {
  try {
    setLoading(true);

    if (bookings.length > 0) {
      // Use cached store data
      setOrders(bookings);
      const filtered = bookings.filter(
        (item) =>
          item.BookingStatus === 'ACTIVE' ||
          item.BookingStatus === 'IN_PROGRESS'
      );
      setFilteredList(filtered);
    } else {
      // Load fresh from API
      const userStr = await AsyncStorage.getItem('USER');
      const user = userStr ? JSON.parse(userStr) : null;
      if (!user) throw new Error('User not logged in');

      const response = await activeBookings(user.id);

      if (response) {
        setBookings(response);
        setOrders(response);
        const filtered = response.filter(
          (item: BookingData) =>
            item.BookingStatus === 'ACTIVE' || item.BookingStatus === 'IN_PROGRESS'
        );
        setFilteredList(filtered);
      }
    }
  } catch (error) {
    console.error('Failed to load bookings:', error);
  } finally {
    setLoading(false);
    setRefreshing(false);
  }
}, [bookings]);


  // WebSocket setup
  useEffect(() => {
    const initSocket = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      socket.current = io(SOCKET_URL, {
        transports: ['websocket'],
        auth: {
          token,
        },
      });

      socket.current.on('connect', () => {
        console.log('Connected to WebSocket');
      });

      socket.current.on('bookingStatusUpdated', (updatedBooking: BookingData) => {
        setOrders((prev) =>
          prev.map((b) => (b.id === updatedBooking.id ? updatedBooking : b))
        );
        setFilteredList((prev) =>
          prev.map((b) => (b.id === updatedBooking.id ? updatedBooking : b))
        );
        setBookings(orders);
      });

      return () => {
        socket.current?.disconnect();
      };
    };

    initSocket();
    loadBookings();
  }, []);

  const handleSearch = (text: string) => {
    setSearch(text);
    const result = orders.filter(
      (item) =>
        item.address?.toLowerCase().includes(text.toLowerCase()) ||
        item.createdAt?.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredList(result);
  };

  const handleCancelBooking = (bookingId: number) => {
    Alert.alert(
      'Cancel Booking',
      'Are you sure you want to cancel this booking?',
      [
        { text: 'No' },
        {
          text: 'Yes',
          onPress: async () => {
            // TODO: Add cancel booking API here
            console.log(`Cancelling booking ${bookingId}`);
          },
        },
      ],
      { cancelable: true }
    );
  };

  const openModal = (booking: BookingData) => {
    setSelectedBooking(booking);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedBooking(null);
    setModalVisible(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="px-4 pt-4">
        <Text className="text-2xl font-bold text-purple-700 mb-3">📘 My Bookings</Text>
        <TextInput
          value={search}
          onChangeText={handleSearch}
          placeholder="🔍 Search by address or date"
          placeholderTextColor="#888"
          className="border bg-white border-gray-300 px-4 py-3 rounded-lg mb-3"
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#7c3aed" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={filteredList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <BookingCard
              item={item}
              onPress={openModal}
              onCancel={handleCancelBooking}
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={loadBookings} />
          }
          ListEmptyComponent={
            <Text className="text-center text-gray-400 mt-10">
              No active bookings found.
            </Text>
          }
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}

      <BookingModal
        visible={isModalVisible}
        booking={selectedBooking}
        onClose={closeModal}
      />
    </SafeAreaView>
  );
};

export default BookingScreen;
