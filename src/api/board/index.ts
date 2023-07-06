import { BoardInfoParams, PostInfoParams } from "./entity";
import boardApi from "./boardApiClient";

export const getBoardDetail = (param: number) => {
  boardApi.get<BoardInfoParams>(`/info?id=${param}`);
};

export const deleteBoard = (param: number) => {
  boardApi.delete(`?id=${param}`);
};

export const getAllBoard = () => {
  boardApi.get(`/all`);
};

export const postBoard = (param: PostInfoParams) => {
  const data = boardApi.post<PostInfoParams>("");
  return data;
};

export const modifyBoard = (param: PostInfoParams) => {
  const data = boardApi.put<PostInfoParams>("");
  return data;
};
