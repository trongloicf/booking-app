import { User } from "@/type/interfaces/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

const TOKEN_USER = Constants.expoConfig?.extra?.TOKEN_USER;
const USER_INFO = Constants.expoConfig?.extra?.USER_INFO;

export const storage = {
  setAuth: async (token: string, user: User) => {
    await AsyncStorage.setItem(TOKEN_USER, token);
    await AsyncStorage.setItem(USER_INFO, JSON.stringify(user));
  },

  getToken: () => AsyncStorage.getItem(TOKEN_USER),

  getUser: async () => {
    const user = await AsyncStorage.getItem(USER_INFO);
    return user ? JSON.parse(user) : null;
  },

  clear: async () => {
    await AsyncStorage.removeItem(TOKEN_USER);
    await AsyncStorage.removeItem(USER_INFO);
  },
};
