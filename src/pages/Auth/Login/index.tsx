import styles from './Login.module.scss';
import AuthDetail from '../../../components/Auth/AuthDetail';
import { Link } from 'react-router-dom';

export default function Login(){

  return(
    <div className={styles.content}>
      <div className={styles.form}>
      <form className={styles.loginform}>
        <AuthDetail name='로그인하기' first='게시판에 게시글을 작성하시려면' second='로그인하세요'/>
        
        <input type="text" placeholder='아이디' className={styles.loginform__input}/>
        <input type="text" placeholder='비밀번호' className={styles.loginform__input}/>
        <div className={styles.loginform__signup}>
          <span>계정이 없으신가요? </span>
          <Link to='/signup' className={styles['loginform__signup--link']}>회원가입</Link>
        </div>
        <button type='submit' className={styles.loginform__login}>로그인</button>
      </form>
      </div>
    </div>
  )
}