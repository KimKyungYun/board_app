import styles from "./Post.module.scss";
import Preview from "./components/Preview";
export default function Post() {
  return (
    <div className={styles.content}>
      <div className={styles.post}>
        <span className={styles.post__title}>게시글 작성</span>
        <form className={styles.form}>
          <label className={styles.form__title}>
            <span className={styles["form__title--text"]}>제목</span>
            <input
              type="text"
              name="title"
              className={styles["form__title--input"]}
              placeholder="제목을 입력해주세요."
            />
          </label>
          <label className={styles.form__content}>
            <span className={styles["form__content--text"]}>본문</span>
            <Preview />
            <textarea
              name="content"
              className={styles["form__content--input"]}
              placeholder="내용을 입력해주세요."
            />
          </label>
          <div className={styles.form__button}>
            <button className={styles["form__button--submit"]}>확인</button>
            <button className={styles["form__button--cancel"]}>취소</button>
          </div>
        </form>
      </div>
    </div>
  );
}
