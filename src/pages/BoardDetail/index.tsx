import styles from "./BoardDetail.module.scss";
import { boardItem } from "store/store";
import { useAtomValue } from "jotai";
// import { getBoardInfo } from "api/Post";
// import { BoardInfo } from "api/Post/entity";
import List from "pages/BoardList/static/entity";

export default function BoardDetail() {
  const id = useAtomValue(boardItem);
  let data = List[id];

  return (
    <div className={styles.content}>
      <div className={styles.detail}>
        <div className={styles.detail__id}>{data.writer}</div>
        <div className={styles.detail__date}>{data.createdAt}</div>
        <div className={styles.detail__viewcount}>{data.viewcount_id}</div>
        <div className={styles.detail__title}>{data.title}</div>
        <div className={styles.detail__content}>{data.content}</div>
      </div>
    </div>
  );
}
