import { RegisterHostProfile, userService } from "@/api/services/user.service";
import { showError, showSuccess } from "@/utils/toast";
import { useMutation } from "@tanstack/react-query";

export const usePostRegisterHost = () => {
  return useMutation({
    mutationKey: ["post-register-host"],
    mutationFn: (profile: RegisterHostProfile) =>
      userService.registerHost(profile),
    onSuccess: () => {
      showSuccess("Đăng ký làm chủ cơ sở thành công");
    },
    onError: (err: Error) => {
      showError(err.message || "Đăng ký làm chủ cơ sở thất bại");
    },
  });
};
