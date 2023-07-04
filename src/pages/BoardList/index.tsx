import { useState } from 'react';
import Pagination from 'components/common/Pagination';
import styles from './BoardList.module.scss';
import List from './static/entity';
import { Link } from 'react-router-dom';
import {useAtom} from 'jotai';
import { boardItem } from 'store/store';
export default function BoardList() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(10);
  const [boardInfo,setBoardInfo]=useAtom(boardItem);
  
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
            <Link to='/detail' onClick={()=>{
              setBoardInfo(item.id)
              console.log(boardInfo);
              
            }}>
              <li className={styles['board__list--item']}>
                <span>{item.id}</span>
                <span>{item.title}</span>
                <span>{item.createdAt}</span>
                <span>{item.writer}</span>
                <span>{item.viewcount_id}</span>
              </li>
            </Link>
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
