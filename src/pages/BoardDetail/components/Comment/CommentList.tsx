import { deleteComment, getComment } from "api/board";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CommentInput from "./CommentInput";
import Loading from "components/common/Loading/Loading";
import styles from "./Comment.module.scss";
import { DateCounter } from "utils/hook/useDateCalculator";

const useEraseComment = (
  boardId: number,
  commentId: number,
  setToggle: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const withdrawComment = async () => {
    const accessToken = sessionStorage.getItem("accessToken");
    const header = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const submitData = {
      boardId: boardId,
      commentId: commentId,
      headers: header,
    };
    try {
      await deleteComment(submitData);
      setToggle(true);
    } catch (error) {
      console.log(error);
    }
  };
  return withdrawComment;
};
export default function CommentList() {
  const [written, setWritten] = useState<boolean>(false);
  const [toggle, setToggle] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [comments, setComments] = useState<Array<object>>();
  const [deleteId, setDeleteId] = useState<number>(-1);
  const sessionId = sessionStorage.getItem("board-id");
  const boardId = sessionId !== null ? parseInt(sessionId) : -1;
  const userId = sessionStorage.getItem("userId");

  const { handleSubmit } = useForm();
  const withdrawComment = useEraseComment(boardId, deleteId, setToggle);

  useEffect(() => {
    const bringComments = async () => {
      setIsLoading(true);
      const data = await getComment(boardId);
      setTimeout(() => {
        setComments(data.data);
        setToggle(false);
        setWritten(false);
        setIsLoading(false);
      }, 100);
    };
    bringComments();
  }, [boardId, written, toggle]);

  return (
    <div className={styles.content}>
      {isLoading && <Loading />}
      <CommentInput id={boardId} setWritten={setWritten} />
      <form className={styles.form} onSubmit={handleSubmit(withdrawComment)}>
        <ul className={styles.form__list}>
          {comments &&
            comments.map((data: any, index) => {
              return (
                <li className={styles.form__item} key={index}>
                  <div className={styles.form__profile}>
                    <span className={styles["form__profile--id"]}>
                      {data.writer}
                    </span>
                    <span className={styles["form__profile--time"]}>
                      {DateCounter(data.updateAt)}
                    </span>
                  </div>
                  <div className={styles.form__content}>
                    <span className={styles["form__content--text"]}>
                      {data.content}
                    </span>
                    {data.writer === userId ? (
                      <button
                        className={styles["form__content--button"]}
                        type="submit"
                        onClick={() => {
                          setDeleteId(data.id);
                        }}
                      >
                        X
                      </button>
                    ) : null}
                  </div>
                </li>
              );
            })}
        </ul>
      </form>
    </div>
  );
}
