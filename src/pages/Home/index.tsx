import styles from "./Home.module.scss";
import List from "assets/images/list.jpg";
import Detail from "assets/images/detail.jpg";
import Write from "assets/images/write.jpg";
import Login from "assets/images/login.jpg";
import Signup from "assets/images/signup.jpg";

export default function Home() {
  const settings = {
    infinite: true,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
  };
  return (
    <div className={styles.oueter}>
      <div className={styles.image1} />

      <div className={styles.inner}>
        게시판을 이용해보세요.
        <span className={styles.inner__first}>
          다양한 사람들과 대화를 해보세요
        </span>
        <img className={styles.inner__img} src={List} alt="" />
      </div>

      <div className={styles.image2} />

      <div className={styles.inner}>
        게시물을 읽어보세요.
        <span className={styles.inner__first}>
          댓글을 통해 사람들과 소통하세요.
        </span>
        <img className={styles.inner__img} src={Detail} alt="" />
      </div>

      <div className={styles.image3} />

      <div className={styles.inner}>
        게시물을 작성해보세요.
        <span className={styles.inner__first}>
          공유하고 싶은 사진이나 올리거나 글을 적어보세요.
        </span>
        <img className={styles.inner__img} src={Write} alt="" />
      </div>
      <div className={styles.inner}>
        게시물을 작성해보세요.
        <span className={styles.inner__first}>
          공유하고 싶은 사진이나 올리거나 글을 적어보세요.
        </span>
        <img className={styles.inner__img} src={Login} alt="" />
      </div>
    </div>
  );
}
