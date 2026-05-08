import {
  LoginData,
  LoginPayload,
  LoginResponse,
  RegisterPayload,
} from "@/type/interfaces/auth";
import { instance } from "../instance";

export const authService = {
  login: async (payload: LoginPayload): Promise<LoginData> => {
    const res = await instance.post<LoginResponse>("auth/login", payload);
    return res.data.data;
  },
  register: async (payload: RegisterPayload) =>
    await instance.post(`auth/register`, payload),
};
