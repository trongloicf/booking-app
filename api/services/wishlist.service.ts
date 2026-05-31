import { isAxiosError } from "axios";
import { instance } from "../instance";

export interface Wishlist {
  wishlistId: number;
  facilityName: string;
  facilityThumbnail: string;
  avgRating: string;
  totalReviews: number;
  cityName: string;
  facilityId: number;
  isWishlisted: boolean;
}

export const wishlistService = {
  getWishlist: async (): Promise<Wishlist[]> => {
    const res = await instance.get(`/wishlists`);
    return res.data.data;
  },
  toggleWishlist: async (facilityId: number) => {
    try {
      const res = await instance.post(`/wishlists/${facilityId}/toggle`);
      return res.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message);
      }
      throw new Error("Đã có lỗi xảy ra khi cập nhật danh sách yêu thích");
    }
  },
};
