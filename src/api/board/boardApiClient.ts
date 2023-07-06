import axios from "axios";

const postApi = axios.create({
  baseURL: `http://43.202.86.32/board`,
  timeout: 2000,
});

export default postApi;
