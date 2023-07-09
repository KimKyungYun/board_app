import { Link, useLocation } from "react-router-dom";
import CompanyLogo from "assets/png/company_logo.png";
import styles from "./TopNavigation.module.scss";
import cn from "utils/ts/className";
import { getAuth } from "store/store";
import { useState } from "react";
import DropDown from "assets/Icon/dropdown.png";

export default function TopNavigation() {
  const auth = getAuth();
  const location = useLocation();
  const [view, setView] = useState<boolean>(false);

  const signOut = () => {
    sessionStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__logo}>
        <Link to="/" className={styles["navbar__logo--link"]}>
          <img src={CompanyLogo} alt="" />
        </Link>
      </div>
      <div className={styles.navbar__dropdown}>
        <img
          className={styles["navbar__dropdown--icon"]}
          src={DropDown}
          alt=""
          onClick={() => setView(!view)}
        />

        <ul
          className={cn({
            [styles["navbar__links"]]: !view,
            [styles["navbar__links--view"]]: view,
          })}
        >
          <li>
            <Link
              to="http://www.jkcore.com/index.html"
              className={cn({
                [styles.navbar__link]: true,
              })}
              onClick={() => setView(false)}
            >
              회사홈페이지
            </Link>
          </li>
          <li>
            <Link
              to="/list"
              className={cn({
                [styles.navbar__link]: true,
                [styles["navbar__link--clicked"]]:
                  location.pathname === "/list",
              })}
              onClick={() => setView(false)}
            >
              커뮤니티
            </Link>
          </li>
          <li>
            <Link
              to="/post"
              className={cn({
                [styles.navbar__link]: true,
                [styles["navbar__link--clicked"]]:
                  location.pathname === "/post",
              })}
              onClick={() => setView(false)}
            >
              글쓰기
            </Link>
          </li>
          {!auth ? (
            <>
              <li>
                <Link
                  to="/login"
                  className={styles.navbar__link}
                  onClick={() => setView(false)}
                >
                  로그인
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className={styles.navbar__link}
                  onClick={() => setView(false)}
                >
                  회원가입
                </Link>
              </li>
            </>
          ) : (
            <li onClick={signOut}>
              <Link
                to="/"
                className={styles.navbar__link}
                onClick={() => setView(false)}
              >
                로그아웃
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
