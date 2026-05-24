import { ApiReponse } from "@/type/interfaces/base";
import { AxiosError, isAxiosError } from "axios";
import { instance } from "../instance";

export interface BookingRequest {
  customerId: number;
  contactName: string;
  contactPhone: string;
  checkin: string;
  checkout: string;
  note: string;
  rooms: RoomBooking[];
  paymentMethod: "CASH" | "MOMO";
  adults: number;
  children: number;
}

export interface RoomBooking {
  roomId: number;
  // roomName: string;
  quantity: number;
  // pricePerNight: number;
  // adults: number;
  // children: number;
  // roomThumbnail: string;
  // roomTypeName: string;
  // bedName: string;
  // facilityName: string;
  // facilityAddress: string;
}

export type BookingResponse = {
  bookingId: number;
  bookingCode: string;
  totalPrice: number;
};

export interface ApiErrorResponse {
  success: boolean;
  status: number;
  message: string;
  data: null;
}

export const bookingService = {
  createBooking: async (data: BookingRequest): Promise<BookingResponse> => {
    try {
      const res = await instance.post<ApiReponse<BookingResponse>>(
        `/bookings`,
        data,
      );
      const response = res.data;
      if (!response.success) {
        throw new Error(response.message || "Đặt phòng thất bại");
      }
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        const serverMessage = axiosError.response?.data?.message;
        throw new Error(serverMessage || "Đặt phòng thất bại");
      }

      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Đã có lỗi hệ thống xảy ra");
    }
  },
  // getDetailBooking: async (bookingId: number): Promise<Item>
};
