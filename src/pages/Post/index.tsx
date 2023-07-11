import { useEffect, useState } from "react";
import { ReactComponent as ErrorIcon } from "assets/Icon/error.svg";
import styles from "./Post.module.scss";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Modal from "components/common/Modal";
import { createPortal } from "react-dom";
import { postBoard } from "api/board";
import cn from "utils/ts/className";

interface PostData {
  images: object;
  title: string;
  content: string;
}

const usePost = (files: any) => {
  const navigate = useNavigate();
  const posting = (form: PostData) => {
    const accessToken = sessionStorage.getItem("accessToken");

    const headers = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    };
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

    const sendBoard = async () => {
      try {
        await postBoard({ formData, headers });

        navigate("/list");
      } catch (error) {
        console.log(error);
      }
    };
    sendBoard();
  };

  return posting;
};
export default function Post() {
  const [modal, setModal] = useState<boolean>(false);
  const [fileName, setFileName] = useState<Array<string>>();
  const [files, setFiles] = useState<any>();

  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm<PostData>({
    mode: "onChange",
    defaultValues: {
      title: "",
      content: "",
    },
  });

  useEffect(() => {
    const names = [];
    if (files) {
      for (let i = 0; i < files.length; i++) {
        names.push(files[i].name);
      }
    }
    setFileName(names);
  }, [files]);

  const postBoard = usePost(files);

  return (
    <div className={styles.content}>
      {modal &&
        createPortal(
          <Modal
            title="게시물 작성"
            content="작성하던 게시물을 취소하시겠습니까?"
            isOpen={setModal}
            path="list"
          />,
          document.body
        )}
      <div className={styles.post}>
        <span className={styles.post__title}>게시글 작성</span>
        <form
          className={styles.form}
          onSubmit={handleSubmit(postBoard)}
          encType="multi-part/form-data"
        >
          <label className={styles.form__title}>
            <div className={styles["form__title--text"]}>
              제목
              <span
                className={cn({
                  [styles["error--active"]]: true,
                  [styles.error]: watch("title") !== "",
                })}
              >
                <ErrorIcon />
                제목을 입력해주세요.
              </span>
            </div>
            <input
              type="text"
              className={styles["form__title--input"]}
              placeholder="제목을 입력해주세요."
              {...register("title", { required: true })}
            />
          </label>
          <label className={styles.form__content}>
            <div className={styles["form__content--text"]}>
              본문
              <span
                className={cn({
                  [styles["error--active"]]: true,
                  [styles.error]: watch("content") !== "",
                })}
              >
                <ErrorIcon />
                본문 내용을 작성해주세요.
              </span>
            </div>
            <textarea
              className={styles["form__content--input"]}
              placeholder="내용을 입력해주세요."
              {...register("content", { required: true })}
            />
            <div className={styles.form__preview}>
              <label htmlFor="file" className={styles["form__preview--label"]}>
                파일찾기
              </label>
              <div className={styles["form__preview--name"]}>{fileName}</div>
              <input
                accept="image/*"
                multiple
                id="file"
                type="file"
                className={styles["form__preview--input"]}
                onChange={(e) => {
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
              onClick={() => setModal(true)}
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
