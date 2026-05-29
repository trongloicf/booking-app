import { isAxiosError } from "axios";
import { instance } from "../instance";

export const cityService = {
  getCities: async () => {
    try {
      const res = await instance.get("/cities", {
        params: { page: 1, limit: 100 },
      });
      return res.data.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        const serverMessage = error.response.data?.message;
        throw new Error(serverMessage || "Lấy danh sách thành phố thất bại");
      }
      throw new Error("Đã có lỗi hệ thống xảy ra");
    }
  },
};
