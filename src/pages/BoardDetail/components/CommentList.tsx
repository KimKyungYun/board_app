import { deleteComment } from "api/board";
import { useState } from "react";
import { useForm } from "react-hook-form";
import checkAxiosErrorMessage from "utils/ts/checkAxiosError";

interface PropsParam {
  comments: Array<object>;
  setWritten: React.Dispatch<React.SetStateAction<boolean>>;
}

const eraseComment = (boardId: number, commentId: number) => {
  const withdrawComment = async () => {
    const accessToken = sessionStorage.getItem("accessToken");
    const header = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const submitData = {
      boardId: boardId,
      commentId: commentId,
      headers: header,
    };
    try {
      await deleteComment(submitData);
    } catch (error) {
      if (checkAxiosErrorMessage(error)) {
        console.log(error);
      }
    }
  };
  return withdrawComment;
};
export default function CommentList({ comments, setWritten }: PropsParam) {
  const [deleteId, setDeleteId] = useState<number>(-1);
  const sessionId = sessionStorage.getItem("board-id");
  const boardId = sessionId !== null ? parseInt(sessionId) : -1;
  const userId = sessionStorage.getItem("userId");

  const { handleSubmit } = useForm();
  const withdrawComment = eraseComment(boardId, deleteId);

  return (
    <div>
      <form onSubmit={handleSubmit(withdrawComment)}>
        <ul>
          {comments &&
            comments.map((data: any, index) => {
              return (
                <li key={index}>
                  {data.writer}
                  {data.content}
                  {data.updateAt}
                  {data.writer === userId ? (
                    <button
                      type="submit"
                      onClick={() => {
                        setDeleteId(data.id);
                        setWritten(true);
                      }}
                    >
                      댓글삭제
                    </button>
                  ) : null}
                </li>
              );
            })}
        </ul>
      </form>
    </div>
  );
}
