import { BoardInfoParams, PostInfoParams, BoardAllparams } from "./entity";
import boardApi from "./boardApiClient";

export const getBoardDetail = (param: number | null | "") => {
  const data = boardApi.get<BoardInfoParams>(`/info?boardId=${param}`);
  return data;
};

export const deleteBoard = (param: number) => {
  boardApi.delete(`?id=${param}`);
};

export const getAllBoard = (param: number) => {
  const data = boardApi.get<BoardAllparams>(`/all?page=${param}`);
  return data;
};

export const postBoard = (param: Blob, headers: object) => {
  const data = boardApi.post<BoardInfoParams>("", param, headers);
  return data;
};

export const modifyBoard = (param: PostInfoParams) => {
  const data = boardApi.put<PostInfoParams>("");
  return data;
};
