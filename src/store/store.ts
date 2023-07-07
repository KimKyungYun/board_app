import { refreshAccessToken } from "api/user/userApiClient";

export const getAuth = () => {
  refreshAccessToken();
  if (sessionStorage.getItem("accessToken")) {
    return true;
  }
  return false;
};

export const clearAuth = () => {
  localStorage.removeItem("refreshToken");
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("username");
};
