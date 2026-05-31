import { reviewService } from "@/api/services/review.service";
import { showError, showSuccess } from "@/utils/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const usePostReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: reviewService.addReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-detail-booking"] });
      queryClient.invalidateQueries({ queryKey: ["facilities"] });
      showSuccess("Đánh giá của bạn đã được gửi thành công");
    },
    onError: (err: Error) => {
      showError(err.message || "Đã có lỗi xảy ra khi gửi đánh giá");
    },
  });
};
