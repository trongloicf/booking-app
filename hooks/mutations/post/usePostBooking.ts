import {
    BookingRequest,
    BookingResponse,
    bookingService,
} from "@/api/services/booking.service";
import { showError, showSuccess } from "@/utils/toast";
import { useMutation } from "@tanstack/react-query";

export const usePostBooking = () => {
  return useMutation<BookingResponse, Error, BookingRequest>({
    mutationKey: ["post-booking"],
    mutationFn: bookingService.createBooking,
    onSuccess: () => showSuccess("Đặt phòng thành công"),
    onError: (error) => showError(error.message || "Đặt phòng thất bại"),
  });
};
