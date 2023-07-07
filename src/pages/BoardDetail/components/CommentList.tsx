import { deleteComment, getComment } from "api/board";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import checkAxiosErrorMessage from "utils/ts/checkAxiosError";

interface PropsParam {
  id: number;
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
export default function CommentList({ id }: PropsParam) {
  const [comments, getComments] = useState<Array<object>>();
  const [deleteId, setDeleteId] = useState<number>(-1);
  const sessionId = sessionStorage.getItem("board-id");
  const boardId = sessionId !== null ? parseInt(sessionId) : -1;
  const userId = sessionStorage.getItem("userId");

  const { handleSubmit } = useForm();
  const withdrawComment = eraseComment(boardId, deleteId);

  useEffect(() => {
    const bringComments = async () => {
      const data = await getComment(id);
      getComments(data.data);
    };
    bringComments();
  });

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
