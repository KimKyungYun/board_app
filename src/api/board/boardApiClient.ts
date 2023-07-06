import axios from "axios";

const boardApi = axios.create({
  baseURL: `http://192.168.2.12:8080/board`,
  timeout: 2000,
});

export default boardApi;
