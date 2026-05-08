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
  return config;
});
