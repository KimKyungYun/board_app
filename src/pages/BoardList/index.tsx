import { useState } from 'react';
import Pagination from 'components/common/Pagination';
import styles from './BoardList.module.scss';
import List from './static/entity';

export default function BoardList() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(10);

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;

  return (
    <div className={styles.content}>
      <div className={styles.board}>
        <div className={styles.board__title}>게시판</div>
        <div className={styles.board__index}>
          <span className={styles['board__index--item']}>No</span>
          <span className={styles['board__index--item']}>제목</span>
          <span className={styles['board__index--item']}>작성 일자</span>
          <span className={styles['board__index--item']}>작성자</span>
          <span className={styles['board__index--item']}>조회수</span>
        </div>
        <ul className={styles.board__list}>
          {List.slice(indexOfFirst, indexOfLast).map((item) => (
            <li className={styles['board__list--item']}>
              <span>{item.id}</span>
              <span>{item.title}</span>
              <span>{item.createdAt}</span>
              <span>{item.user_id}</span>
              <span>{item.viewcount}</span>
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
