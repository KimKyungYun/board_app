export const getAuth = () => {
  if (
    localStorage.getItem("refreshToken") &&
    sessionStorage.getItem("accessToken")
  ) {
    return true;
  }
  return false;
};

export const clearAuth = () => {
  localStorage.removeItem("refreshToken");
  sessionStorage.removeItem("accessToken");
};
