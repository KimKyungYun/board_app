import { useState } from "react";
import styles from "./BoardList.module.scss";
import List from "./static/entity";
import Pagination from "components/common/Pagination";

export default function BoardList() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(16);

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;

  return (
    <div className={styles.content}>
      <div className={styles.board}>
        <div className={styles.board__title}>게시판</div>
        <div className={styles.board__index}>
          <span>No</span>
          <span>제목</span>
          <span>작성자</span>
          <span>조회수</span>
        </div>
        <ul className={styles.board__list}>
          {List.slice(indexOfFirst, indexOfLast).map((item) => (
            <li key={item.id} className={styles["board__list--item"]}>
              <span>{item.id}</span>
              <span>{item.title}</span>
              <span>{item.writer}</span>
              <span>{item.view}</span>
            </li>
          ))}
        </ul>
      </div>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={List.length}
        currentPage={currentPage}
        paginate={setCurrentPage}
      />
    </div>
  );
}
