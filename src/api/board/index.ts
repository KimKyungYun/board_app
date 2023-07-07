import {
  BoardInfoParams,
  PostInfoParams,
  BoardAllparams,
  CommentInfoParams,
  CommentDeleteParams,
} from "./entity";
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

export const postComment = (param: CommentInfoParams) => {
  boardApi.post(`/${param.boardId}/comment`, param.content, param.headers);
  console.log(param.content);
};

export const deleteComment = (param: CommentDeleteParams) => {
  boardApi.delete<string>(
    `/${param.boardId}/comment?commentId=${param.commentId}`,
    param.headers
  );
};
