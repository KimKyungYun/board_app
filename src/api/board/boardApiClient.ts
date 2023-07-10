import axios from "axios";
import { API_PATH } from "config/constants";

const boardApi = axios.create({
  baseURL: `http://${API_PATH}/board`,
  timeout: 2000,
});

export default boardApi;
