import { bookingService } from "@/api/services/booking.service";
import { useQuery } from "@tanstack/react-query";

export const useGetDetailBooking = (bookingId: number) => {
  return useQuery({
    queryKey: ["get-detail-booking", bookingId],
    queryFn: () => bookingService.getDetailBooking(bookingId),
    enabled: !!bookingId,
  });
};
