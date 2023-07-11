import { Link, useLocation } from "react-router-dom";
import CompanyLogo from "assets/png/company_logo.png";
import styles from "./TopNavigation.module.scss";
import cn from "utils/ts/className";
import { getAuth } from "store/store";
import { useEffect, useState } from "react";
import useMediaQuery from "utils/hook/useMediaQuery";
import DropDown from "assets/Icon/dropdown.png";
import AuthModal from "components/Auth/AuthModal";

export default function TopNavigation() {
  const auth = getAuth();
  const location = useLocation();
  const { isMobile } = useMediaQuery();
  const [modal, setModal] = useState<boolean>(false);
  const [view, setView] = useState<boolean>(false);

  useEffect(() => {
    getAuth();
  }, [auth]);
  return (
    <nav className={styles.navbar}>
      {modal && (
        <AuthModal
          title="로그아웃"
          content="로그아웃하시겠습니까?"
          isOpen={setModal}
        />
      )}
      <div className={styles.navbar__logo}>
        <Link to="/" className={styles["navbar__logo--link"]}>
          <img src={CompanyLogo} alt="" />
        </Link>
      </div>
      <div className={styles.navbar__dropdown}>
        {isMobile && (
          <img
            className={styles["navbar__dropdown--icon"]}
            src={DropDown}
            alt=""
            onClick={() => setView(!view)}
          />
        )}
        <ul
          className={cn({
            [styles["navbar__links"]]: !isMobile,
            [styles.navbar__mobile]: !view && isMobile,
            [styles["navbar__mobile--view"]]: view && isMobile,
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
          {!auth ? (
            <>
              {location.pathname !== "/login" && (
                <li>
                  <Link
                    to="/login"
                    className={styles.navbar__link}
                    onClick={() => setView(false)}
                  >
                    로그인
                  </Link>
                </li>
              )}
              {location.pathname !== "/signup" && (
                <li>
                  <Link
                    to="/signup"
                    className={styles.navbar__link}
                    onClick={() => setView(false)}
                  >
                    회원가입
                  </Link>
                </li>
              )}
            </>
          ) : (
            <li>
              <span
                className={styles.navbar__link}
                onClick={() => {
                  setView(false);
                  setModal(true);
                }}
              >
                로그아웃
              </span>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
