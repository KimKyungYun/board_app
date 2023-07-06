export interface BoardInfoParams {
  createdAt: string;
  updateAt: string;
  content: string;
  title: string;
  writer: string;
  viewcount_id: number;
  id: number;
}

export interface PostInfoParams {
  images: object;
  request: object;
}
