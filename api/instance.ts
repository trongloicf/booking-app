import { storage } from "@/utils/authWrapper";
import axios from "axios";
import Constants from "expo-constants";
import { DEVICE } from "./constant/device";

const BASE_URL = Constants.expoConfig?.extra?.BASE_URL;

console.log("url", BASE_URL);

export const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use(async (config) => {
  config.headers = config.headers || {};
  config.headers["x-client-type"] = DEVICE.MOBILE;
  const token = await storage.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;

    if (status === 401) {
      console.log("Token hết hạn → logout");

      await storage.clear();
    }

    return Promise.reject(error);
  },
);
