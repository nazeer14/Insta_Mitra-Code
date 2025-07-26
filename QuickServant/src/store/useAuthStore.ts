// src/auth/useAuthStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PersistStorage } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: any | [];
  isAuthenticated: boolean;
  setAuth: (accessToken: string, refreshToken: string,user: any) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: [],
      isAuthenticated: false,
      setAuth: (accessToken,refreshToken, user) =>
        set({ accessToken, refreshToken, user, isAuthenticated: true }),
      logout: () =>
        set({ accessToken: null,refreshToken:null, user: [], isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
      storage: AsyncStorage as unknown as PersistStorage<AuthState>,
    }
  )
);
