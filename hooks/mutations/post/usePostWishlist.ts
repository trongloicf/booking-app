import { wishlistService } from "@/api/services/wishlist.service";
import { showError, showSuccess } from "@/utils/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const usePostWishlist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: wishlistService.toggleWishlist,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["get-all-wishlist"] });
      if (data.isWishlisted) {
        showSuccess("Đã thêm vào danh sách yêu thích");
      } else {
        showSuccess("Đã xóa khỏi danh sách yêu thích");
      }
    },
    onError: (err: Error) => {
      showError(
        err.message || "Đã có lỗi xảy ra khi thêm vào danh sách yêu thích",
      );
    },
  });
};
