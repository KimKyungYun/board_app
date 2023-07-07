import { refreshAccessToken } from "api/user/userApiClient";

export const getAuth = () => {
  if (sessionStorage.getItem("accessToken")) {
    return true;
  } 
  else if (localStorage.getItem("refreshToken")) {
    refreshAccessToken();
    return true;
  }
  return false;
};

export const clearAuth = () => {
  localStorage.removeItem("refreshToken");
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("username");
};
