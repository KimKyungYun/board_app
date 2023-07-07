/* eslint-disable react-hooks/rules-of-hooks */
import styles from "./BoardDetail.module.scss";
import { useEffect, useState } from "react";
import { getBoardDetail } from "api/board";
import User from "assets/png/login_logo.png";
import Loading from "components/common/Loading/Loading";
import CommentList from "./components/CommentList";
import CommentInput from "./components/CommentInput";
import { useNavigate } from "react-router-dom";
import { getAuth } from "store/store";
import { deleteBoard } from "api/board";

const controlBoard = (boardId: number) => {
  const navigate = useNavigate();
  const eraseBoard = async () => {
    const accessToken = sessionStorage.getItem("accessToken");
    const header = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const submitData = {
      boardId: boardId,
      headers: header,
    };
    try {
      await deleteBoard(submitData);
      navigate("/list");
    } catch (error) {
      console.log(error);
    }
  };
  return eraseBoard;
};

export default function BoardDetail() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [modal, setModal] = useState<boolean>(false);
  const auth = getAuth();
  const userId = sessionStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    const getDetail = async () => {
      const sessionId = sessionStorage.getItem("board-id");
      const id = sessionId && parseInt(sessionId);
      const data = await getBoardDetail(id);
      setData(data.data);
      setIsLoading(false);
      console.log(data);
    };
    getDetail();
  }, []);

  const eraseBoard = controlBoard(data?.id);

  return (
    <div className={styles.content}>
      {modal && (
        <div className={styles.modal}>
          <div className={styles.modal__box}>
            <span>삭제하시겠습니까?</span>
            <button onClick={eraseBoard}>네</button>
            <button
              onClick={() => {
                setModal(false);
              }}
            >
              아니오
            </button>
          </div>
        </div>
      )}
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
          {auth && data.writer === userId && (
            <span>
              <button onClick={() => navigate("/modify")}>수정하기</button>
              <button onClick={() => setModal(true)}>삭제하기</button>
            </span>
          )}
        </div>
      )}
      <CommentInput id={data?.id} />
      <CommentList id={data?.id} />
    </div>
  );
}
