import { bookingService } from "@/api/services/booking.service";
import { showError, showSuccess } from "@/utils/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const usePutCancelBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["put-cancel-booking"],
    mutationFn: (bookingId: number) => bookingService.cancelBooking(bookingId),
    onSuccess: (_, bookingId) => {
      queryClient.invalidateQueries({
        queryKey: ["get-detail-booking", bookingId],
      });
      queryClient.invalidateQueries({ queryKey: ["get-all-booking"] });
      showSuccess("Hủy đơn đặt phòng thành công");
    },
    onError: (err: Error) => {
      showError(err.message || "Hủy đơn đặt phòng thất bại");
    },
  });
};
