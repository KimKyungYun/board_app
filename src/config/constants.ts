/* eslint-disable no-console */
const checkEnvVar = (name: string) => {
  const envVar = process.env[name];
  if (!envVar) {
    console.error(`환경변수 파일에 ${name}가 존재하지 않습니다!`);
    return "";
  }
  return envVar;
};

export const API_PATH = checkEnvVar("REACT_APP_API_PATH");
