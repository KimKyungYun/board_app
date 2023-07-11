import {
  BoardInfoParams,
  PostInfoParams,
  BoardAllparams,
  CommentPostParams,
  CommentDeleteParams,
  BoardDeleteParams,
} from "./entity";
import boardApi from "./boardApiClient";
import axios from "axios";

export const getBoardDetail = (param: number | null | "") => {
  const data = boardApi.get<BoardInfoParams>(`/info?boardId=${param}`);
  return data;
};

export const deleteBoard = (param: BoardDeleteParams) => {
  axios.delete(
    `http://43.202.86.32/board?boardId=${param.boardId}`,
    param.headers
  );
};

export const getAllBoard = (param: number) => {
  const data = boardApi.get<BoardAllparams>(`/all?page=${param}`);
  return data;
};

export const postBoard = (param: PostInfoParams) => {
  const data = boardApi.post("", param.formData, param.headers);
  return data;
};

export const modifyBoard = (param: PostInfoParams) => {
  const data = boardApi.put("", param.formData, param.headers);
  return data;
};

export const getComment = (param: number) => {
  const data = boardApi.get(`/${param}/comments`);
  return data;
};
export const postComment = (param: CommentPostParams) => {
  boardApi.post(`/${param.boardId}/comment`, param.content, param.headers);
  console.log(param.content);
};

export const deleteComment = (param: CommentDeleteParams) => {
  boardApi.delete<string>(
    `/${param.boardId}/comment?commentId=${param.commentId}`,
    param.headers
  );
};
