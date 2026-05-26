import { ApiReponse } from "@/type/interfaces/base";
import { ParamsGetBooking } from "@/type/interfaces/booking";
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
  getAllBooking: async ({ page, limit, status }: ParamsGetBooking) => {
    const res = await instance.get(`/bookings`, {
      params: { page, limit, status },
    });

    if (!res.data.success) {
      throw new Error(res.data.message || "Lấy lịch sử booking thất bại");
    }

    return res.data;
  },
  getDetailBooking: async (bookingId: number) => {
    const res = await instance.get(`bookings/${bookingId}`);
    if (!res.data.success) {
      throw new Error(
        res.data.message || "Lấy chi tiết đơn đặt phòng thất bại",
      );
    }
    return res.data;
  },
  cancelBooking: async (bookingId: number) => {
    try {
      const res = await instance.put(`bookings/${bookingId}/cancel`);
      return res.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        const serverMessage =
          error.response.data?.message ||
          "Server gặp sự cố không thể hủy phòng";
        throw new Error(serverMessage);
      }

      throw new Error("Không thể kết nối đến máy chủ");
    }
  },
};
