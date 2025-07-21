// src/auth/useAuthStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PersistStorage } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  user: any | null;
  isAuthenticated: boolean;
  setAuth: (token: string, user: any) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      setAuth: (token, user) =>
        set({ token, user, isAuthenticated: true }),
      logout: () =>
        set({ token: null, user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
      storage: AsyncStorage as unknown as PersistStorage<AuthState>,
    }
  )
);
