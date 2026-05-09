import { authService } from "@/api/services/auth.service";
import { storage } from "@/utils/authWrapper";
import { showError, showSuccess } from "@/utils/toast";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { router } from "expo-router";

export const usePostLogin = () => {
  return useMutation({
    mutationKey: ["post-login"],
    mutationFn: authService.login,

    onSuccess: async (res) => {
      try {
        await storage.setAuth(res.token, res.user);
        router.push({
          pathname: "/(tabs)",
        });
        showSuccess("Đăng nhập thành công");
      } catch (err) {
        showError("Không thể lưu thông tin đăng nhập");
      }
    },

    onError: (err: unknown) => {
      if (err instanceof AxiosError) {
        showError(err.response?.data?.message || "Đăng nhập thất bại");
        return;
      }
      showError("Có lỗi không xác định");
    },
  });
};
