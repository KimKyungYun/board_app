import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ErrorIcon } from "assets/Icon/error.svg";
import styles from "./Login.module.scss";
import AuthDetail from "components/Auth/AuthDetail";
import { useForm } from "react-hook-form";
import { PASSWORD_REGEXP } from "components/Auth/static/Regexp";
import { useState } from "react";
import { login } from "api/user";
import User from "assets/png/login_logo.png";
import PassWord from "assets/png/password_logo.png";
import JKLogo from "assets/png/company.png";

interface LoginFormInput {
  username: string;
  password: string;
}

const useLoginRequest = ({
  onError,
}: {
  onSuccess?: (success: string) => void;
  onError?: (error: string) => void;
}) => {
  const navigate = useNavigate();

  const submitLogin = async ({ username, password }: LoginFormInput) => {
    if (!PASSWORD_REGEXP.test(password)) {
      onError?.(
        "비밀번호는 문자, 숫자, 특수문자를 포함한 8~16자리로 이루어져야 합니다."
      );
    } else {
      try {
        const { data } = await login({
          username: username,
          password,
        });
        sessionStorage.setItem("accessToken", data.accessToken);
        sessionStorage.setItem("userId", username);
        localStorage.setItem("refreshToken", data.refreshToken);
        navigate("/");
      } catch (error) {
        console.log("서버 통신 중 오류가 발생했습니다.");
      }
    }
  };

  return submitLogin;
};
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<LoginFormInput>({
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [errorMsg, setErroMsg] = useState<string>("");
  const submitLogin = useLoginRequest({ onError: setErroMsg });

  return (
    <div className={styles.content}>
      <div className={styles.form}>
        <form className={styles.loginform} onSubmit={handleSubmit(submitLogin)}>
          <img src={JKLogo} alt="" className={styles.loginform__logo} />
          {/* <AuthDetail
            name="로그인하기"
            first="게시판에 게시글을 작성하시려면"
            second="로그인하세요"
          /> */}
          <div className={styles.error}>
            {errorMsg && <ErrorIcon aria-hidden />}
            {errorMsg}
          </div>
          <div className={styles.loginform__container}>
            <img
              src={User}
              alt=""
              className={styles["loginform__container--logo"]}
            />
            <input
              type="text"
              placeholder="아이디"
              className={styles.loginform__input}
              {...register("username", { required: true })}
            />
          </div>
          <div className={styles["loginform__container"]}>
            <img
              src={PassWord}
              alt=""
              className={styles["loginform__container--logo"]}
            />
            <input
              type="password"
              placeholder="비밀번호"
              className={styles.loginform__input}
              {...register("password", { required: true })}
            />
          </div>
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
