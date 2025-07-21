import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, PersistStorage } from 'zustand/middleware';
import { BookingData } from '~/services/bookingsServices';

interface BookingState {
  bookings: BookingData[];
  setBookings: (bookings: BookingData[]) => void;
  clearBookings: () => void;
}
const zustandAsyncStorage: PersistStorage<BookingState> = {
  getItem: async (name) => {
    const value = await AsyncStorage.getItem(name);
    return value ? JSON.parse(value) : null;
  },
  setItem: async (name, value) => {
    await AsyncStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: async (id) => {
    await AsyncStorage.removeItem(id);
  },
};

export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      bookings: [],
      setBookings: (bookings) => set({ bookings }),
      clearBookings: () => set({ bookings: [] }),
    }),
    {
      name: 'bookings-storage',
      storage: zustandAsyncStorage,
    }
  )
);
