export interface BoardInfoParams {
  id: number;
  title: string;
  content: string;
  writer: string;
  images: Array<string>;
  viewCount: number;
}

export interface BoardAllparams {
  data: object;
}

export interface PostInfoParams {
  images: object;
  request: object;
}

export interface BoardDeleteParams {
  boardId: number;
  headers: object;
}
export interface CommentPostParams {
  boardId: number;
  content: object;
  headers: object;
}

export interface CommentDeleteParams {
  boardId: number;
  commentId: number;
  headers: object;
}
