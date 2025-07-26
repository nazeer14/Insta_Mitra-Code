// utils/axiosInstance.ts
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import * as SecureStore from 'expo-secure-store';
import { API_BASE_URL } from '@env';
interface RefreshResponse {
  accessToken: string;
}

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add access token to requests
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await SecureStore.getItemAsync('accessToken');
    console.log('Using access token:', token);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },(error: AxiosError) => Promise.reject(error)
);

// Refresh token on 401 response
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const refreshToken = await SecureStore.getItemAsync('refreshToken');
        if (!refreshToken) throw new Error('No refresh token');

        const refreshResponse = await axios.post<RefreshResponse>(
          `${API_BASE_URL}/auth/refresh-token`,
          { refreshToken }
        );

        const newAccessToken = refreshResponse.data.accessToken;
        await SecureStore.setItemAsync('accessToken', newAccessToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        return api(originalRequest);
      } catch (refreshError) {
        console.error('Refresh failed:', refreshError);
        // Optional: Handle logout here
      }
    }

    return Promise.reject(error);
  }
);

export default api;
