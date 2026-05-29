import { userService } from "@/api/services/user.service";
import { useQuery } from "@tanstack/react-query";

export const useGetProfile = (userId: number | null) => {
  return useQuery({
    queryKey: ["get-profile", userId],
    queryFn: () => userService.getProfile(userId!),
    enabled: !!userId && !isNaN(userId),
  });
};
