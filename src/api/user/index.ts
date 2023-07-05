import {
  LoginParams,
  LoginResponse,
  RegisterParams,
  User,
  CheckIdDuplicateParams,
} from "./entity";
import userApi from "./userApiClient";

export const register = (param: RegisterParams) =>
  userApi.post<User>("/signup", param);

export const login = async (param: LoginParams) => {
  const { data } = await userApi.post<string>("/signin", param);
  return { data };
};

export const checkIdDuplicate = (param: CheckIdDuplicateParams) =>
  userApi.get<User>(`/info?userId=${param.account}`);
