import { ApiReponse } from "@/type/interfaces/base";
import { instance } from "../instance";

export interface BookingRequest {
  customerId: number;
  contactName: string;
  contactPhone: string;
  checkin: string;
  checkout: string;
  note: string;
  room: RoomBooking;
  paymentMethod: "CASH" | "MOMO";
}

export interface RoomBooking {
  roomId: number;
  quantity: number;
  pricePerNight: number;
  adults: number;
  children: number;
}

export type BookingResponse = {
  bookingId: number;
  bookingCode: string;
  totalPrice: number;
};

export const bookingService = {
  createBooking: async (data: BookingRequest): Promise<BookingResponse> => {
    const res = await instance.post<ApiReponse<BookingResponse>>(
      `/bookings`,
      data,
    );
    const response = res.data;
    if (!response.success) {
      throw new Error(response.message || "Đặt phòng thất bại");
    }
    return response.data;
  },
};
