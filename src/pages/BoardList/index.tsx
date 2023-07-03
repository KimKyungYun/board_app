import styles from "./BoardList.module.scss";
export default function BoardList() {
  return (
    <div className={styles.content}>
      <div className={styles.list}>
        목록
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
        </ul>
      </div>
    </div>
  );
}
