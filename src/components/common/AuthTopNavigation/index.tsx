import styles from './AuthTopNavigation.module.scss';
import { Link } from 'react-router-dom';

export default function AuthTopNavigation(){
  const auth=true;
  return(
    <nav className={styles.navbar}>
      <div className={styles.navbar__logo}>
        <Link to='/' className={styles['navbar__logo--link']}>
          메인
        </Link>
      </div>
        <ul className={styles.navbar__links}>
          <li><Link to='/list' className={styles.navbar__link}>게시판</Link></li>
          <li><Link to='/post' className={styles.navbar__link}>글쓰기</Link></li>
          {auth ? <li><Link to='/singnup' className={styles.navbar__link}>회원가입</Link></li>:''}
        </ul>
    </nav>
  )
}