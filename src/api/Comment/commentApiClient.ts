import axios from "axios";

const commentApi = axios.create({
  baseURL: `http://43.202.86.32/posts`,
  timeout: 2000,
});
