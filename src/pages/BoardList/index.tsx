import { useEffect, useState } from "react";
import Pagination from "components/common/Pagination";
import styles from "./BoardList.module.scss";
import { Link } from "react-router-dom";
import { getAllBoard } from "api/board";
import { DateCounter } from "utils/hook/useDateCalculator";
import Loading from "components/common/Loading/Loading";
import { createPortal } from "react-dom";
export default function BoardList() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [list, setList] = useState<any>();
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllBoard(currentPage);
        setList(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [currentPage, isLoading]);

  return (
    <div className={styles.content}>
      {isLoading && createPortal(<Loading />, document.body)}
      <div className={styles.board}>
        <div className={styles.board__title}>커뮤니티</div>
        <div className={styles.board__index}>
          <span className={styles["board__index--item"]}>No</span>
          <span className={styles["board__index--item"]}>제목</span>
          <span className={styles["board__index--item"]}>작성 일자</span>
          <span className={styles["board__index--item"]}>작성자</span>
          <span className={styles["board__index--item"]}>조회수</span>
        </div>
        <ul className={styles.board__list}>
          {list?.data.content.map((item: any) => (
            <Link
              to="/detail"
              key={item.id}
              className={styles["board__list--link"]}
              onClick={async () =>
                await sessionStorage.setItem("board-id", item.id)
              }
            >
              <li className={styles["board__list--item"]}>
                <span>{item.id}</span>
                <span>{item.title}</span>
                <span>{DateCounter(item.updateAt)}</span>
                <span>{item.writer}</span>
                <span>{item.viewCount}</span>
              </li>
            </Link>
          ))}
        </ul>
        <div className={styles.write}>
          <Link to="/post">
            <button type="button" className={styles.write__button}>
              글쓰기
            </button>
          </Link>
        </div>
      </div>
      <Pagination
        totalPage={list?.data.totalPages}
        currentPage={currentPage}
        paginate={setCurrentPage}
      />
    </div>
  );
}
