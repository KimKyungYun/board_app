import axios, { AxiosError } from "axios";
import { API_PATH } from "config/constants";

const postApi = axios.create({
  baseURL: `${API_PATH}/post`,
  timeout: 2000,
});

export default postApi;