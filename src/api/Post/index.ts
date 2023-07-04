import { ViewCount, BoardInfo } from "./entity";
import postApi from "./postApiClient";

export const getBoardInfo=(param:number)=>{
  postApi.get<BoardInfo>(`/post?id=${param}`);
}