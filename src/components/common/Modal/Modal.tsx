import styles from "./Modal.module.scss";
interface ModalData {
  title: string;
  content: string;
}
export default function Modal({ title, content }: ModalData) {
  return (
    <div className={styles.content}>
      <div>
        <div>{title}</div>
        <div>{content}</div>
      </div>
    </div>
  );
}
