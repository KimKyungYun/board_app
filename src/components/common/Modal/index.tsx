import { useNavigate } from "react-router-dom";
import styles from "./Modal.module.scss";
import Detail from "components/Auth/Detail";

interface ModalData {
  title: string;
  content: string;
  isOpen: React.Dispatch<React.SetStateAction<boolean>>;
  path: string;
}

export default function Modal({ title, content, isOpen, path }: ModalData) {
  const navigate = useNavigate();
  return (
    <div className={styles.modal}>
      <div className={styles.modal__popup}>
        <div className={styles.modal__message}></div>
        <Detail name={title} first={content} second="" />
        <div className={styles.modal__button}>
          <button
            className={styles["modal__button--access"]}
            type="button"
            onClick={() => navigate(`/${path}`)}
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
