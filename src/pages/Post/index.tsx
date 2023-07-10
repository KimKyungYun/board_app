import { useState } from "react";
import styles from "./Post.module.scss";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

interface PostData {
  images: object;
  title: string;
  content: string;
}

const usePost = (files: any) => {
  const navigate = useNavigate();
  const posting = (form: PostData) => {
    const accessToken = sessionStorage.getItem("accessToken");

    const requestObject = {
      title: form.title,
      content: form.content,
    };
    const requestBlob = new Blob([JSON.stringify(requestObject)], {
      type: "application/json",
    });

    const formData = new FormData();
    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append("images", files[i]);
      }
    }
    formData.append("request", requestBlob);
    console.log(files);

    const postBoard = async () => {
      await axios
        .post("http://43.202.86.32/board", formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          navigate("/list");
        })
        .catch((error) => {
          console.log(error);
        });
    };
    postBoard();
  };

  return posting;
};
export default function Post() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [files, setFiles] = useState<any>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<PostData>({
    mode: "onChange",
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const postBoard = usePost(files);

  return (
    <div className={styles.content}>
      <div className={styles.post}>
        <span className={styles.post__title}>게시글 작성</span>
        <form
          className={styles.form}
          onSubmit={handleSubmit(postBoard)}
          encType="multi-part/form-data"
        >
          <label className={styles.form__title}>
            <span className={styles["form__title--text"]}>제목</span>
            <input
              type="text"
              className={styles["form__title--input"]}
              placeholder="제목을 입력해주세요."
              {...register("title", { required: true })}
            />
          </label>
          <label className={styles.form__content}>
            <span className={styles["form__content--text"]}>본문</span>
            <textarea
              className={styles["form__content--input"]}
              placeholder="내용을 입력해주세요."
              {...register("content", { required: true })}
            />
            <div className={styles.form__preview}>
              <label htmlFor="file" className={styles["form__preview--label"]}>
                파일찾기
              </label>
              <div className={styles["form__preview--name"]}>
                {fileName ? fileName : "첨부파일"}
              </div>
              <input
                accept="image/*"
                multiple
                id="file"
                type="file"
                className={styles["form__preview--input"]}
                onChange={(e) => {
                  setFileName(e.target.value);
                  setFiles(e.target.files);
                }}
              />
            </div>
          </label>
          <div className={styles.form__button}>
            <button
              type="submit"
              className={styles["form__button--submit"]}
              disabled={!isValid}
            >
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
