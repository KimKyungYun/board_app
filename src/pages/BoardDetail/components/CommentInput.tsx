import { getAuth } from "store/store";
import styles from "./Comment.module.scss";
import { postComment } from "api/board";
import { useForm } from "react-hook-form";
// import { useState } from "react";

interface CommentData {
  id: number;
  comments: Array<object>;
  setWritten: React.Dispatch<React.SetStateAction<boolean>>;
}
interface CommentSentence {
  content: string;
}
const setComment = (id: number, reset: Function) => {
  const sendComment = async (formData: CommentSentence) => {
    const accessToken = sessionStorage.getItem("accessToken");
    const header = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const submitData = {
      boardId: id,
      content: { content: formData.content },
      headers: header,
    };
    try {
      await postComment(submitData);
      reset();
    } catch (error) {
      console.log(error);
    }
  };
  return sendComment;
};

export default function CommentInput({
  id,
  comments,
  setWritten,
}: CommentData) {
  const auth = getAuth();

  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm<CommentSentence>({
    mode: "onChange",
    defaultValues: {
      content: "",
    },
  });
  const submitComment = setComment(id, reset);

  return (
    <div className={styles.content}>
      <span>댓글 {comments ? comments.length : 0}개</span>
      <div className={styles.writing}>
        <form
          className={styles.writing__form}
          onSubmit={handleSubmit(submitComment)}
        >
          <label>
            댓글 작성
            <span>
              {auth ? (
                <input
                  type="text"
                  placeholder="댓글을 입력해주세요."
                  // onChange={(e) => setText(e.target.value)}
                  {...register("content", { required: true })}
                />
              ) : (
                <input
                  type="text"
                  placeholder="로그인 후 이용해주세요."
                  disabled
                />
              )}
              <button
                type="submit"
                disabled={!isValid || !auth}
                onClick={() => {
                  setWritten(true);
                }}
              >
                댓글 쓰기
              </button>
            </span>
          </label>
        </form>
      </div>
    </div>
  );
}
