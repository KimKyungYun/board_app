import { useNavigate } from "react-router-dom";
import styles from "./AuthModal.module.scss";
import AuthDetail from "components/Auth/AuthDetail";
import { clearAuth } from "store/store";

interface ModalData {
  title: string;
  content: string;
  isOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AuthModal({ title, content, isOpen }: ModalData) {
  const navigate = useNavigate();
  
  return (
    <div className={styles.modal}>
      <div className={styles.modal__popup}>
        <div className={styles.modal__message}></div>
        <AuthDetail name={title} first={content} second="" />
        <div className={styles.modal__button}>
          <button
            className={styles["modal__button--access"]}
            type="button"
            onClick={() => {
              clearAuth();
              isOpen(false);
              navigate("/");
            }}
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
