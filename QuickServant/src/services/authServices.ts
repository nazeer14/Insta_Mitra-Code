import axios from "axios";

const API_BASE_URL = 'https://quickservent-874j.onrender.com/api';

export interface LoginResponse {
  token: string;
    id: string;
    fullname: string;
    mobileno:number;
    email: string;
    role?: string;
}
export interface LoginPayload {
  mobileno: string;
  password: string;
}

export const LoginUser=async(payload:LoginPayload):Promise<LoginResponse>=>{
    try{
    const response=await axios.post<LoginResponse>(`${API_BASE_URL}/auth/login`,payload)
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