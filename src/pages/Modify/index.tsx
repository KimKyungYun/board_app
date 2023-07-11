import { useEffect, useState } from "react";
import styles from "./Modify.module.scss";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getBoardDetail } from "api/board";
import Loading from "components/common/Loading/Loading";
import { createPortal } from "react-dom";
import Modal from "components/common/Modal";
import { modifyBoard } from "api/board";

const usePost = (id: number, files: any, title: string, content: string) => {
  const navigate = useNavigate();
  const modifying = () => {
    const accessToken = sessionStorage.getItem("accessToken");
    const headers = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    };
    const requestObject = {
      id: id,
      title: title,
      content: content,
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

    const editBoard = async () => {
      try {
        await modifyBoard({ formData, headers });
        navigate("/list");
      } catch (error) {
        console.log(error);
      }
    };
    editBoard();
  };

  return modifying;
};
export default function Modify() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [data, setData] = useState<any>(null);
  const [modal, setModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fileName, setFileName] = useState<Array<string>>();
  const [files, setFiles] = useState<any>();

  const { handleSubmit } = useForm();

  const postBoard = usePost(data?.id, files, title, content);

  useEffect(() => {
    const getDetail = async () => {
      const sessionId = sessionStorage.getItem("board-id");
      const id = sessionId && parseInt(sessionId);
      const data = await getBoardDetail(id);
      setData(data.data);
      setTitle(data.data.title);
      setContent(data.data.content);
      setIsLoading(false);
    };
    getDetail();
  }, []);

  useEffect(() => {
    const names = [];
    if (files) {
      for (let i = 0; i < files.length; i++) {
        names.push(files[i].name);
      }
    }
    setFileName(names);
  }, [files]);

  return (
    <div className={styles.content}>
      {isLoading && <Loading />}
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
        <span className={styles.post__title}>게시글 수정</span>
        <form
          className={styles.form}
          onSubmit={handleSubmit(postBoard)}
          encType="multi-part/form-data"
        >
          <label className={styles.form__title}>
            <span className={styles["form__title--text"]}>제목</span>
            <input
              value={title}
              type="text"
              className={styles["form__title--input"]}
              placeholder="제목을 입력해주세요."
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label className={styles.form__content}>
            <span className={styles["form__content--text"]}>본문</span>
            <textarea
              value={content}
              content={data?.content}
              className={styles["form__content--input"]}
              placeholder="내용을 입력해주세요."
              onChange={(e) => setContent(e.target.value)}
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
              disabled={title === "" && content === ""}
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
