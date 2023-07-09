import { refreshAccessToken } from "api/user/userApiClient";

export const getAuth = () => {
  if (
    sessionStorage.getItem("accessToken") &&
    sessionStorage.getItem("userId")
  ) {
    return true;
  } else if (
    localStorage.getItem("refreshToken") &&
    sessionStorage.getItem("userId")
  ) {
    refreshAccessToken();
    return true;
  } else {
    localStorage.removeItem("refreshToken");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("userId");
  }
  return false;
};

export const clearAuth = () => {
  localStorage.removeItem("refreshToken");
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("username");
};
