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
