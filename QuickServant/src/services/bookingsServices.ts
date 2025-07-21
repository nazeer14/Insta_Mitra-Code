import axios, { AxiosError } from "axios";
import { API_BASE_URL } from "@env";

export interface BookingData {
  id: number;
  userId: number;
  ProviderId: number;
  longitude: string;
  latitude: string;
  address: string;
  serviceType: string;
  serviceName: string;
  serviceDate: string | any;
  timeSlot: string | any;
  BookingStatus: any;
  amount: any;
  discount: any;
  finalPrice: any;
  PaymentStatus: any;
  PaymentMethod: any;
  TransactionId: string;
  createdAt: any;
  completedAt: any;
  startedAt: any;
  cancelledAt: any;
  otpForStart: number;
  trackingStatus: string;
  cancellationReason: string;
  penaltyApplied: string;
  rating: number;
  review: string;
  reviewedAt: any;
}

// Return type can be adjusted to BookingData or BookingData[] depending on backend
export const activeBookings = async (id: number): Promise<BookingData[] | null> => {
  try {
    const res = await axios.post<BookingData[]>(`${API_BASE_URL}/bookings/get-user/${id}`);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
        let message="Somthing is worng. Please try again."
      if (status === 401 || status === 403) {
        message="Unauthorized access";
      } else if (status === 404) {
        message="Booking not found";
      } else if (status === 500) {
        message="Server Problem. Please try after some time.";
      } else if(error?.response?.data?.message) {
        message=error?.response?.data?.message;
      }
      throw new Error(message);
    } else {
      throw new Error("An unknown error occurred");
    }
    return null;
  }
};
