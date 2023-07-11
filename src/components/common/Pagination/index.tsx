import styles from "./Pagination.module.scss";
import cn from "utils/ts/className";
import { ReactComponent as Arrow } from "assets/Icon/arrow_icon.svg";

interface BoardList {
  totalPage: number;
  currentPage: number;
  paginate: React.Dispatch<React.SetStateAction<number>>;
}

export default function Pagination({
  totalPage,
  currentPage,
  paginate,
}: BoardList) {
  const pageBlock = [];
  for (let i = 0; i < totalPage; i++) {
    pageBlock.push(i);
  }
  const onClick = (pageNum: number) => {
    if (pageNum === 10) {
      if (currentPage + 10 <= currentPage) {
        paginate(currentPage + 11 - (currentPage % 10));
      } else {
        paginate(totalPage - 1);
      }
    } else if (pageNum === -10) {
      if (currentPage - 10 >= 1) {
        paginate(currentPage - 9 - (currentPage % 10));
      } else {
        paginate(0);
      }
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
              {number + 1}
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
