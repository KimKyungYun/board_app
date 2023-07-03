import {Link} from 'react-router-dom';
import {ReactComponent as Logo} from '../../../assets/Icon/board_icon.svg';
import styles from './TopNavigation.module.scss';

export default function TopNavigation(){
  const auth=true;
  return(
    <nav className={styles.navbar}>
      <div className={styles.navbar__logo}>
        <Link to='/' className={styles['navbar__logo--link']}>
          <Logo />
        </Link>
      </div>
        <ul className={styles.navbar__links}>
          <li><Link to='/list' className={styles.navbar__link}>게시판</Link></li>
          <li><Link to='/post' className={styles.navbar__link}>글쓰기</Link></li>
          {auth ? <li><Link to='/login' className={styles.navbar__link}>로그인</Link></li>:''}
        </ul>
    </nav>
  )
}