import { useLocalSearchParams } from "expo-router";

export interface BookingParams {
  checkin: string;
  checkout: string;
  adults: number;
  children: number;
  room?: number;
}

export interface UseBookingParamsReturn {
  roomId: number;
  bookingData: BookingParams;
}

export const useBookingParams = () => {
  const params = useLocalSearchParams();
  return {
    roomId: Number(params.id),
    bookingData: {
      checkin: (params.checkin as string) || "",
      checkout: (params.checkout as string) || "",
      adults: Number(params.adult || 1),
      children: Number(params.children || 0),
    },
  };
};
