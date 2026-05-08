import { ApiReponse } from "./base";

export interface LoginPayload {
  user_email: string;
  user_pass: string;
}

export interface User {
  user_id: number;
  user_name: string;
  role_code: string;
}

export interface LoginData {
  token: string;
  user: User;
}

export type LoginResponse = ApiReponse<LoginData>;

export interface RegisterPayload {
  user_name: string;
  user_email: string;
  user_pass: string;
}

export type RegisterForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};
