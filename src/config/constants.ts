const checkEnvVar = (name: string) => {
  const envVar = process.env[name];
  if (!envVar) {
    return "";
  }
  return envVar;
};

// API 공통
export const API_PATH = checkEnvVar("REACT_APP_API_PATH");
export const SERVER_LOGIN_REDIRECT_URL = checkEnvVar(
  "REACT_APP_SERVER_LOGIN_REDIRECT_URL"
);
