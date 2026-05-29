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
};
