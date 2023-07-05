import axios, { AxiosError } from "axios";
import { RefreshResponse } from "./entity";

const userApi = axios.create({
  baseURL: `http://43.202.86.32/user`,
  timeout: 2000,
});

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    return Promise.reject();
  }
  try {
    const { data } = await userApi.get<string>(
      `/token?refreshToken=${refreshToken}`
    );
    console.log(data);
    sessionStorage.setItem("accessToken", data);
  } catch {
    sessionStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    return null;
  }
};

userApi.interceptors.request.use((config) => {
  const accessToken = sessionStorage.getItem("accessToken");

  if (config.headers && accessToken)
    config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

// App단에서 'user/me' 호출할 때 accessToken을 갱신하므로 userApi에 종속.
// userApi.interceptors.response.use(
//   // 성공시
//   (response) => response,

//   // 실패시
//   (error: AxiosError) => {
//     try {
//       return Promise.reject(error);
//     } catch {
//       alert("네트워크 오류가 발생했습니다.");
//       return Promise.reject(error);
//     }
//   }
// );

export default userApi;
