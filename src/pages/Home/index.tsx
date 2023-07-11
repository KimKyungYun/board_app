import styles from "./Home.module.scss";
import List from "assets/pages/list.png";
import Detail from "assets/pages/detail.png";
import Write from "assets/pages/write.png";
import Login from "assets/pages/login.png";
import Signup from "assets/pages/sign_up.png";
import { useEffect, useState } from "react";
import cn from "utils/ts/className";
import useMediaQuery from "utils/hook/useMediaQuery";
import { Link } from "react-router-dom";
import { getAuth } from "store/store";

export default function Home() {
  const auth = getAuth();
  const { isMobile } = useMediaQuery();
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      isMobile
        ? setCurrentPage(Math.trunc(window.scrollY / window.innerHeight))
        : setCurrentPage(
            Math.trunc(window.scrollY / (window.innerHeight * 1.5))
          );
    });
    return () => {
      window.removeEventListener("scroll", () => {
        isMobile
          ? setCurrentPage(Math.trunc(window.scrollY / window.innerHeight))
          : setCurrentPage(
              Math.trunc(window.scrollY / (window.innerHeight * 1.5))
            );
      });
    };
  }, [isMobile]);

  return (
    <div className={styles.oueter}>
      <div className={styles.image1} />
      <div className={styles.inner}>
        게시판을 이용해보세요.
        <span className={styles.inner__first}>
          다양한 사람들과 대화를 해보세요
        </span>
        <img
          className={cn({
            [styles.inner__img]: currentPage < 1,
            [styles["inner__img--active"]]: currentPage >= 1,
          })}
          src={List}
          alt=""
        />
        <div className={styles.inner__first}>
          다양한 사람들과 대화를,
          <br /> 다른 사람들의 일상을 구경해보세요.
        </div>
      </div>

      <div className={styles.image2} />

      <div className={styles.inner}>
        게시물을 읽어보세요.
        <span className={styles.inner__first}>
          댓글을 통해 사람들과 소통하세요.
        </span>
        <img
          className={cn({
            [styles.inner__img]: currentPage < 3,
            [styles["inner__img--active"]]: currentPage >= 3,
          })}
          src={Detail}
          alt=""
        />
        <span className={styles.inner__first}>
          자유롭게 의견을 주고받아보세요.
        </span>
      </div>

      <div className={styles.image3} />

      <div className={styles.inner}>
        게시물을 작성해보세요.
        <span className={styles.inner__first}>
          공유하고 싶은 사진이나 올리거나 글을 적어 공유해보세요.
        </span>
        <img
          className={cn({
            [styles.inner__img]: currentPage < 5,
            [styles["inner__img--active"]]: currentPage >= 5,
          })}
          src={Write}
          alt=""
        />
        <span className={styles.inner__first}>
          언제나 자유롭게 글을 수정하고 삭제할 수 있어요.
        </span>
      </div>
      <div className={styles.image4}></div>

      <div className={styles.inner__last}>
        글을 작성하고 싶으신가요?
        <span className={styles.inner__first}>
          회원가입을 통해 자유롭게 이용하세요.
        </span>
        <img
          className={cn({
            [styles.inner__img]: currentPage < 7,
            [styles["inner__img--active"]]: currentPage >= 7,
          })}
          src={Signup}
          alt=""
        />
        <img
          className={cn({
            [styles.inner__img]: currentPage < 7,
            [styles["inner__img--active"]]: currentPage >= 7,
          })}
          src={Login}
          alt=""
        />
        <span className={styles.inner__first}>
          저희의 회원이 되어 게시판을 자유롭게 사용하세요!
        </span>
        {auth ? (
          <Link to="/list" className={styles.inner__link}>
            게시글 보러가기
          </Link>
        ) : (
          <Link to="/signup" className={styles.inner__link}>
            회원가입하러 가기
          </Link>
        )}
      </div>
    </div>
  );
}
