import { getAuth } from "store/store";
import styles from "./Comment.module.scss";
import { postComment } from "api/board";
import { useForm } from "react-hook-form";
import { useState } from "react";

interface CommentData {
  id: number;
  setWritten: React.Dispatch<React.SetStateAction<boolean>>;
}
interface CommentSentence {
  content: string;
}
const setComment = (
  id: number,
  reset: Function,
  setWritten: React.Dispatch<React.SetStateAction<boolean>>
) => {
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
      setWritten(true);
      reset();
    } catch (error) {
      console.log(error);
    }
  };
  return sendComment;
};

export default function CommentInput({ id, setWritten }: CommentData) {
  const auth = getAuth();
  const [wordCount, setWordCount] = useState<number>(0);

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
  const submitComment = setComment(id, reset, setWritten);

  return (
    <div className={styles.writing}>
      <form
        className={styles.writing__form}
        onSubmit={handleSubmit(submitComment)}
      >
        <label>
          <span className={styles["writing__form--title"]}>댓글 작성</span>
          <div className={styles["writing__form__container"]}>
            {auth ? (
              <>
                <textarea
                  className={styles["writing__form--input"]}
                  placeholder="댓글을 입력해주세요."
                  maxLength={255}
                  {...register("content", {
                    required: true,
                    onChange: (e) => setWordCount(e.target.value.length),
                  })}
                />
              </>
            ) : (
              <textarea
                className={styles["writing__form--input"]}
                placeholder="로그인 후 이용해주세요."
                disabled
              />
            )}
            <button
              className={styles["writing__form--button"]}
              type="submit"
              disabled={!isValid || !auth}
              onClick={() => setWordCount(0)}
            >
              댓글 쓰기
            </button>
          </div>
          <span className={styles["writing__form--count"]}>
            {wordCount}/255
          </span>
        </label>
      </form>
    </div>
  );
}
