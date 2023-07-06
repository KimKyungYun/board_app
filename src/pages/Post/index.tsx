import { useState } from "react";
import styles from "./Post.module.scss";
import { useNavigate } from "react-router-dom";
export default function Post() {
  const [fileName, setFileName] = useState<string | null>(null);
  const navigate = useNavigate();
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
            <textarea
              name="content"
              className={styles["form__content--input"]}
              placeholder="내용을 입력해주세요."
            />
            <div className={styles.form__preview}>
              <label htmlFor="file" className={styles["form__preview--label"]}>
                파일찾기
              </label>
              <span
                placeholder="첨부파일"
                className={styles["form__preview--name"]}
              >
                {fileName ? fileName : "파일찾기"}
              </span>
              <input
                accept="image/*"
                multiple
                id="file"
                type="file"
                className={styles["form__preview--input"]}
                onChange={(e) => {
                  e.target.value && setFileName(e.target.value);
                }}
              />
            </div>
          </label>
          <div className={styles.form__button}>
            <button type="submit" className={styles["form__button--submit"]}>
              확인
            </button>
            <button
              type="button"
              className={styles["form__button--cancel"]}
              onClick={() => navigate("/list")}
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
