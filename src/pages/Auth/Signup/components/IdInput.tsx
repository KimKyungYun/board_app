import { ReactComponent as ErrorIcon } from "assets/Icon/error.svg";
import styles from "../Signup.module.scss";
import cn from "utils/ts/className";
import { useFormContext } from "react-hook-form";
import { SignUpFormData } from "../static/signUp";
import { checkIdDuplicate } from "api/user";
import IdIcon from "assets/png/login_logo.png";

interface ErrorParam {
  errorMsg: string;
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>;
}

const useIdCheckServer = (
  id: string,
  setErroMsg: React.Dispatch<React.SetStateAction<string>>
) => {
  const checkId = async () => {
    try {
      const data = await checkIdDuplicate(id);
      if (data === undefined) {
        setErroMsg("");
      } else {
        setErroMsg("중복된 아이디입니다.");
      }
    } catch (error) {}
  };
  return checkId;
};

export default function IdInput({ errorMsg, setErrorMsg }: ErrorParam) {
  const { register, watch } = useFormContext<SignUpFormData>();

  const checkDuplicate = useIdCheckServer(watch("id"), setErrorMsg);

  return (
    <div className={styles.form__form}>
      <label className={styles.form__label} htmlFor="id-input">
        <div className={styles.form__error} role="alert">
          <ErrorIcon
            className={cn({
              [styles["form__error-icon"]]: true,
              [styles["form__error-icon--active"]]: errorMsg !== "",
            })}
            aria-hidden
          />
          {errorMsg}
        </div>
      </label>
      <div className={styles.form__container}>
        <img src={IdIcon} alt="" className={styles["form__logo"]} />
        <input
          placeholder="아이디를 입력하세요"
          id="id-input"
          className={cn({
            [styles.form__input]: true,
            [styles["form__input--id"]]: true,
            [styles["form__input--error"]]: errorMsg !== "",
          })}
          // TODO: 아이디 중복확인 기능
          {...register("id", {
            required: true,
            onChange: () => setErrorMsg("아이디 중복체크를 해주세요."),
          })}
        />
      </div>
      <button
        type="button"
        className={cn({
          [styles["form__id-check-button"]]: true,
          [styles["form__id-check-button--active"]]: watch("id") !== "",
          [styles["form__id-check-button--error"]]: errorMsg !== "",
        })}
        onClick={checkDuplicate}
      >
        중복 확인
      </button>
    </div>
  );
}
