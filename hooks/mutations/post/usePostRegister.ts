import { authService } from "@/api/services/auth.service";
import { showError, showSuccess } from "@/utils/toast";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const usePostRegister = () => {
  return useMutation({
    mutationKey: ["post-register"],
    mutationFn: authService.register,

    onSuccess: () => {
      showSuccess("Đăng ký thành công");
    },

    onError: (err: unknown) => {
      if (err instanceof AxiosError) {
        showError(err.response?.data?.message || "Đăng ký thất bại");
        return;
      }
      showError("Có lỗi không xác định");
    },
  });
};
