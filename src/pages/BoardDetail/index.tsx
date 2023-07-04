import styles from "./BoardDetail.module.scss";
import { BoardInfo } from "api/Post/entity";

export default function BoardDetail({createdAt,content,title,writer,viewcount_id,id}:BoardInfo) {
  return (
    <div className={styles.content}>
      <div className={styles.detail}>
        <div className={styles.detail__title}>{title}</div>
        <div className={styles.detail__id}>{writer}</div>
        <div className={styles.detail__content}>{content}</div>
        <div className={styles.detail__date}>{createdAt}</div>
        <div className={styles.detail__viewcount}>{viewcount_id}</div>
      </div>
    </div>
  );
}
