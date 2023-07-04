import { Link } from "react-router-dom";
import { ReactComponent as ErrorIcon } from "assets/Icon/error.svg";
import styles from "./Login.module.scss";
import AuthDetail from "../../../components/Auth/AuthDetail";
import { useForm } from "react-hook-form";
import { ID_REGEXP, PASSWORD_REGEXP } from "components/Auth/static/Regexp";
import { useState } from "react";

interface LoginFormInput {
  id: string;
  password: string;
}

export default function Login() {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<LoginFormInput>({
    mode: "onChange",
    defaultValues: {
      id: "",
      password: "",
    },
  });

  const onSubmit = ({ id, password }: LoginFormInput) => {
    if (!ID_REGEXP.test(id)) {
      setErrorMsg(
        `아이디 형식이 잘못되었습니다.
        (영어 숫자를 포함한 5자리이상, 19자리이하)`
      );
    }
    if (!PASSWORD_REGEXP.test(password)) {
      setErrorMsg(
        `비밀번호 형식이 잘못되었습니다.
        (특수문자,영문,숫자를 포함한 16자이하)`
      );
    } else {
      setErrorMsg(null);
    }
  };

  return (
    <div className={styles.content}>
      <div className={styles.form}>
        <form className={styles.loginform} onSubmit={handleSubmit(onSubmit)}>
          <AuthDetail
            name="로그인하기"
            first="게시판에 게시글을 작성하시려면"
            second="로그인하세요"
          />
          <div className={styles.error}>
            {errorMsg && <ErrorIcon aria-hidden />}
            {errorMsg}
          </div>
          <input
            type="text"
            placeholder="아이디"
            className={styles.loginform__input}
            {...register("id", { required: true })}
          />
          <input
            type="password"
            placeholder="비밀번호"
            className={styles.loginform__input}
            {...register("password", { required: true })}
          />
          <div className={styles.loginform__signup}>
            <span>계정이 없으신가요? </span>
            <Link to="/signup" className={styles["loginform__signup--link"]}>
              회원가입
            </Link>
          </div>
          <button
            type="submit"
            className={styles.loginform__login}
            disabled={!isValid}
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}
