import { isAxiosError } from "axios";
import { instance } from "../instance";

export interface RegisterHostProfile {
  companyName: string;
  phone: string;
  address: string;
  taxCode: string;
}

export const userService = {
  getProfile: async (userId: number) => {
    const res = await instance.get(`/users/${userId}`);
    return res.data;
  },
  registerHost: async (profile: RegisterHostProfile) => {
    try {
      const res = await instance.post(`/users/register-host`, profile);
      return res.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        const serverMessage =
          error.response.data?.message ||
          "Server gặp sự cố không thể hủy phòng";
        throw new Error(serverMessage);
      }

      throw new Error("Không thể kết nối đến máy chủ");
    }
  },
};
