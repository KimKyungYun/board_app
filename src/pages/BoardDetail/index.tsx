/* eslint-disable react-hooks/rules-of-hooks */
import styles from "./BoardDetail.module.scss";
import { useEffect, useState } from "react";
import { getBoardDetail } from "api/board";
import User from "assets/png/login_logo.png";
import ViewCount from "assets/png/view_count.png";
import Loading from "components/common/Loading/Loading";
import CommentList from "./components/CommentList";
import { useNavigate } from "react-router-dom";
import { getAuth } from "store/store";
import Modal from "components/common/Modal/Modal";
import { createPortal } from "react-dom";

export default function BoardDetail() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [modal, setModal] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>();
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getDetail = async () => {
      const sessionId = sessionStorage.getItem("board-id");
      const id = sessionId && parseInt(sessionId);
      setIsLoading(true);
      const data = await getBoardDetail(id);
      setData(data.data);
      setUserId(sessionStorage.getItem("userId"));
      setIsLoading(false);
      console.log(data);
    };
    getDetail();
  }, []);

  return (
    <div className={styles.content}>
      <span onClick={() => window.history.back()} className={styles.toboard}>
        {"< 게시판으로"}
      </span>
      {isLoading && <Loading />}
      {modal &&
        createPortal(
          <Modal
            title="게시물 삭제하기"
            content="삭제하시겠습니까?"
            isOpen={setModal}
            boardId={data?.id}
          />,
          document.body
        )}
      {data && (
        <div className={styles.detail}>
          <div className={styles.detail__container}>
            <div className={styles.detail__id}>
              <img src={User} alt="" className={styles["detail__id--icon"]} />
              {data.writer}
            </div>
            <div className={styles.detail__date}>{data.createdAt}</div>
            <div className={styles.detail__viewcount}>
              <img
                className={styles["detail__viewcount--img"]}
                src={ViewCount}
                alt=""
              />
              {data.viewCount}
            </div>
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
          {auth && data.writer === userId && (
            <span className={styles.detail__button}>
              <button
                className={styles["detail__button--modify"]}
                onClick={() => navigate("/modify")}
              >
                수정하기
              </button>
              <button
                className={styles["detail__button--delete"]}
                onClick={() => setModal(true)}
              >
                삭제하기
              </button>
            </span>
          )}
        </div>
      )}
      <CommentList />
    </div>
  );
}
