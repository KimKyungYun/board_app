import styles from "./BoardDetail.module.scss";
import { useEffect, useState } from "react";
import Comment from "./components/Comment";
import { getBoardDetail } from "api/board";
import User from "assets/png/login_logo.png";
export default function BoardDetail() {
  const [data, setData] = useState<any>();

  useEffect(() => {
    const getDetail = async () => {
      const sessionId = sessionStorage.getItem("board-id");
      const id = sessionId && parseInt(sessionId);
      const data = await getBoardDetail(id);
      console.log(data);
      console.log(id);
      setData(data.data);
    };
    getDetail();
  }, []);

  return (
    <div className={styles.content}>
      {data && (
        <div className={styles.detail}>
          <div className={styles.detail__container}>
            <div className={styles.detail__id}>
              <img src={User} alt="" className={styles["detail__id--icon"]} />
              {data.writer}
            </div>
            <div className={styles.detail__date}>{data.createdAt}</div>
            <div className={styles.detail__viewcount}>{data.viewcount_id}</div>
          </div>
          <div className={styles.detail__container}>
            <span className={styles.detail__title}>{data.title}</span>
          </div>
          <div className={styles.detail__container}>
            {data.images.map((url: string) => {
              return <img src={url} alt="" className={styles.detail__photo} />;
            })}
          </div>
          <div className={styles.detail__container}>
            <div className={styles.detail__content}>{data.content}</div>
          </div>
        </div>
      )}
      <Comment />
    </div>
  );
}
