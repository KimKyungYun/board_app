import styles from "./BoardList.module.scss";
export default function BoardList() {
  return (
    <div className={styles.content}>
      <div className={styles.board}>
        <div>
          <span>No</span>
          <span>제목</span>
          <span>작성자</span>
          <span>조회수</span>
        </div>
        <ul className={styles.board__list}>
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
