import { LoginParams, RegisterParams, User, LoginResponse } from "./entity";
import userApi from "./userApiClient";

export const register = (param: RegisterParams) =>
  userApi.post<User>("/signup", param);

export const login = async (param: LoginParams) => {
  const data = await userApi.post<LoginResponse>("/signin", param);
  return data;
};

export const checkIdDuplicate = (param: string) => {
  const data = userApi.get<User>(`/info?userId=${param}`);
  return data;
};
