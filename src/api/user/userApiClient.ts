import axios, { AxiosError } from "axios";
import { API_PATH } from "config/constants";

const userApi = axios.create({
  baseURL: `http://${API_PATH}/user`,
  timeout: 2000,
});

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    return null;
  }
  try {
    const { data } = await userApi.get<string>(
      `/token?refreshToken=${refreshToken}`
    );
    sessionStorage.setItem("accessToken", data);
  } catch {
    sessionStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    return null;
  }
};

userApi.interceptors.request.use((config) => {
  const accessToken = sessionStorage.getItem("accessToken");
  // eslint-disable-next-line no-param-reassign
  if (config.headers && accessToken)
    config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

// App단에서 'user/me' 호출할 때 accessToken을 갱신하므로 userApi에 종속.
userApi.interceptors.response.use(
  // 성공시
  (response) => response,

  // 실패시
  (error: AxiosError) => {
    try {
      // TODO: 백엔드단에서 정확한 토큰 인증 오류 시 코드/메시지를 정해주면 수정 필요.
    } catch {
      return Promise.reject(error);
    }
  }
);

export default userApi;
