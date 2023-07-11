import { useNavigate } from "react-router-dom";
import styles from "./CommentModal.module.scss";
import Detail from "components/Auth/Detail";
import { deleteBoard } from "api/board";

interface ModalData {
  title: string;
  content: string;
  isOpen: React.Dispatch<React.SetStateAction<boolean>>;
  boardId: number;
}

const controlBoard = (boardId: number) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
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

export default function CommentModal({
  title,
  content,
  isOpen,
  boardId,
}: ModalData) {
  const deleteBoard = controlBoard(boardId);
  return (
    <div className={styles.modal}>
      <div className={styles.modal__popup}>
        <div className={styles.modal__message}></div>
        <Detail name={title} first={content} second="" />
        <div className={styles.modal__button}>
          <button
            className={styles["modal__button--access"]}
            type="button"
            onClick={deleteBoard}
          >
            네
          </button>
          <button
            className={styles["modal__button--deny"]}
            type="button"
            onClick={() => isOpen(false)}
          >
            아니오
          </button>
        </div>
      </div>
    </div>
  );
}
