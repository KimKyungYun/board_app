import axios from "axios";

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

export default userApi;
