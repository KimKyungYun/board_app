import styles from "./BoardDetail.module.scss";
import { useEffect, useState } from "react";
import { getBoardDetail } from "api/board";
import User from "assets/png/login_logo.png";
import Loading from "components/common/Loading/Loading";
import CommentList from "./components/CommentList";
import CommentInput from "./components/CommentInput";

export default function BoardDetail() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isWritten, setIsWritten] = useState<boolean>(false);

  useEffect(() => {
    const getDetail = async () => {
      const sessionId = sessionStorage.getItem("board-id");
      const id = sessionId && parseInt(sessionId);
      const data = await getBoardDetail(id);
      setData(data.data);
      setIsLoading(false);
      setIsWritten(false);
      console.log("호출됌");
    };
    getDetail();
  }, [isWritten]);
  console.log(data?.comments);

  return (
    <div className={styles.content}>
      {isLoading && <Loading />}
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
              return (
                <img
                  key={url}
                  src={url}
                  alt=""
                  className={styles.detail__photo}
                />
              );
            })}
          </div>
          <div className={styles.detail__container}>
            <div className={styles.detail__content}>{data.content}</div>
          </div>
        </div>
      )}
      <CommentInput
        id={data?.id}
        comments={data?.comments}
        setWritten={setIsWritten}
      />
      <CommentList comments={data?.comments} setWritten={setIsWritten} />
    </div>
  );
}
