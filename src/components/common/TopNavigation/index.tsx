import { Link, useLocation } from "react-router-dom";
import { ReactComponent as Logo } from "../../../assets/Icon/board_icon.svg";
import CompanyLogo from "assets/png/company_logo.png";
import styles from "./TopNavigation.module.scss";
import cn from "utils/ts/className";

export default function TopNavigation() {
  const auth = true;
  const location = useLocation();

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__logo}>
        <Link to="/" className={styles["navbar__logo--link"]}>
          <img src={CompanyLogo} alt="" />
        </Link>
      </div>
      <ul className={styles.navbar__links}>
        <li>
          <Link
            to="/list"
            className={cn({
              [styles.navbar__link]: true,
              [styles["navbar__link--clicked"]]: location.pathname === "/list",
            })}
          >
            커뮤니티
          </Link>
        </li>
        <li>
          <Link
            to="/post"
            className={cn({
              [styles.navbar__link]: true,
              [styles["navbar__link--clicked"]]: location.pathname === "/post",
            })}
          >
            글쓰기
          </Link>
        </li>
        {auth ? (
          location.pathname === "/login" ? (
            <li>
              <Link to="/signup" className={styles.navbar__link}>
                회원가입
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/login" className={styles.navbar__link}>
                로그인
              </Link>
            </li>
          )
        ) : (
          <li>
            <Link to="/" className={styles.navbar__link}>
              로그아웃
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
