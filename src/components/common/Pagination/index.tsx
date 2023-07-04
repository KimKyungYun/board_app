import styles from "./Pagination.module.scss";
import cn from "utils/ts/className";
import { ReactComponent as Arrow } from "assets/Icon/arrow_icon.svg";
import { useState } from "react";

interface BoardList {
  postsPerPage: number;
  totalPosts: number;
  currentPage: number;
  paginate: React.Dispatch<React.SetStateAction<number>>;
}
export default function Pagination({
  postsPerPage,
  totalPosts,
  currentPage,
  paginate,
}: BoardList) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  const [blockNum, setBlockNum] = useState(0);
  let pageBlock = pageNumbers.slice(blockNum * 10, blockNum * 10 + 10);

  const onClick = (pageNum: number) => {
    if (pageNum === 10 && currentPage + 10 <= pageNumbers.length) {
      setBlockNum(blockNum + 1);
      paginate(currentPage + 11 - (currentPage % 10));
    } else if (pageNum === -10 && currentPage - 10 >= 1) {
      setBlockNum(blockNum - 1);
      paginate(currentPage - 9 - (currentPage % 10));
    }
  };

  return (
    <nav className={styles.content}>
      <ul className={styles.pagination}>
        <div className={styles.pagination__left} onClick={() => onClick(-10)}>
          <Arrow />
        </div>
        {pageBlock.map((number) => (
          <li key={number} className={styles.pagination__item}>
            <span
              onClick={() => paginate(number)}
              className={cn({
                [styles["pagination__link"]]: true,
                [styles["pagination__link--clicked"]]: currentPage === number,
              })}
            >
              {number}
            </span>
          </li>
        ))}
        <div className={styles.pagination__right} onClick={() => onClick(10)}>
          <Arrow />
        </div>
      </ul>
    </nav>
  );
}
