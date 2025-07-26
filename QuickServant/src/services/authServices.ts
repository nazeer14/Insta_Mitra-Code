import axios from "axios";
import api from "~/utils/axiosInstance";
//const API_BASE_URL = 'https://quickservent-874j.onrender.com/api';


export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    phoneNumber: string;
    isVerified: boolean;
  };
}
export interface LoginPayload {
  phoneNumber: string;
  otp: string;
}

export const sendOtp = async (phoneNumber: string): Promise<void> => {
  try {
    await axios.post(`http://192.168.1.2:8080/api/auth/send/${phoneNumber}`);
  }
  catch (error: any) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      console.log('Error sending OTP:', error.message);
      let message = 'Something went wrong. Please try again later.';

      if (status === 400) {
        message = 'Invalid phone number format.';
      } else if (status === 429) {
        message = 'Too many requests. Please wait before trying again.';
      } else if (error.response?.data?.message) {
        message = error.response.data.message;
      } 
      throw new Error(message);
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
  }

export const verifyOtp=async(payload:LoginPayload):Promise<LoginResponse>=>{
    try{
    const response=await axios.post<LoginResponse>('http://192.168.1.2:8080/api/auth/login',payload)
    return response.data;
    
}catch(error:any){
     if (axios.isAxiosError(error)) {
      const status = error.response?.status;

      let message = 'Something went wrong. Please try again later.';

      if (status === 401) {
        message = 'Invalid credentials. Please check your email and password.';
      } else if (status === 403) {
        message = 'Access denied. Your account may be restricted.';
      } else if (status === 500) {
        message = 'Server error. Please try again later.';
      } else if (error.response?.data?.message) {
        message = error.response.data.message;
      } 
      throw new Error(message);
    } else {
      throw new Error('An unexpected error occurred');
    }
}
}