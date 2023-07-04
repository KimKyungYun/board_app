import axios, { AxiosError } from "axios";
import { API_PATH } from "config/constants";

const commentApi = axios.create({
  baseURL: `${API_PATH}/posts`,
  timeout: 2000,
});
