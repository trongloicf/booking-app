import { isAxiosError } from "axios";
import { instance } from "../instance";

export interface ReviewData {
  bookingId: number;
  rating: number;
  comment: string;
}

export const reviewService = {
  addReview: async (reviewData: ReviewData) => {
    try {
      const res = await instance.post(`/reviews`, reviewData);
      return res.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message);
      }
      throw new Error("Đã có lỗi xảy ra khi gửi đánh giá");
    }
  },
};
