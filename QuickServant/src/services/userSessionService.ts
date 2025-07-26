// services/sessionService.ts
import axios from 'axios';
import api from '../utils/axiosInstance';

interface SessionRequest {
  userId: number;
  location?: string;
  deviceId?: string;
  appVersion?: string;
}

interface SessionResponse {
  id: number;
  userId: number;
  deviceId: string;
  sessionStart: string;
  sessionEnd?: string;
  durationInSeconds?: number;
  isActive: boolean;
  location?: string;
  appVersion?: string;
  lastActivityAt: string;
}

export const startUserSession = async (
  userId: number,
  location?: string,
  deviceId?: string,
  appVersion?: string
): Promise<SessionResponse> => {
  const payload: SessionRequest = {
    userId,
    location,
    deviceId,
    appVersion,
  };

  const response = await api.post<SessionResponse>(`/user-session/start?userId=${payload.userId}&location=${payload.location}&deviceId=${payload.deviceId}&appVersion=${payload.appVersion}`);
  return response.data;
};

export const endUserSession = async (sessionId: number): Promise<SessionResponse> => {
  const response = await api.post<SessionResponse>(`/sessions/end/${sessionId}`);
  return response.data;
};