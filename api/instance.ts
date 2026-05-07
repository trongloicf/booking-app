import axios from "axios";
import Config from "react-native-config";

export const instance = axios.create({
  baseURL: Config.API_URL,
  timeout: 10000,
});
