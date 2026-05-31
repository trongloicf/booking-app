import { wishlistService } from "@/api/services/wishlist.service";
import { useQuery } from "@tanstack/react-query";

export const useGetWishlist = () => {
  return useQuery({
    queryKey: ["get-all-wishlist"],
    queryFn: () => wishlistService.getWishlist(),
  });
};
