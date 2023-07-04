import { ViewCount, BoardInfo } from "./entity";
import postApi from "./postApiClient";

export const getBoardInfo=(param:BoardInfo)=>{
  postApi.get<BoardInfo>(`/post?id=${param.id}`);
}