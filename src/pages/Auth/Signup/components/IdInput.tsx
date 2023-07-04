import cn from "utils/ts/className";
import { ReactComponent as ErrorIcon } from "assets/svg/auth/error.svg";
import { useFormContext } from "react-hook-form";
import { checkIdDuplicate } from "api/user";
import { ERROR_MESSAGE } from "pages/Auth/Signup/static/signUp";
import styles from "../SignUp.module.scss";
import { SignUpFormData } from "../static/signUp";

export default function IdInput() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<SignUpFormData>();

  return (
    <div className={styles.form__form}>
      <label className={styles.form__label} htmlFor="id-input">
        아이디
        <div className={styles.form__error} role="alert">
          <ErrorIcon
            className={cn({
              [styles["form__error-icon"]]: true,
              [styles["form__error-icon--active"]]: errors?.id !== undefined,
            })}
            aria-hidden
          />
          {errors.id?.message}
        </div>
      </label>
      <input
        placeholder="아이디를 입력하세요"
        id="id-input"
        className={cn({
          [styles.form__input]: true,
          [styles["form__input--id"]]: true,
          [styles["form__input--error"]]: errors?.id !== undefined,
        })}
        // TODO: 아이디 중복확인 기능
        {...register("id", {
          required: ERROR_MESSAGE.id,
          validate: {
            checkValid: (val) => val === "" || "아이디 중복확인을 해주세요.",
          },
        })}
      />
      <button
        type="button"
        className={cn({
          [styles["form__id-check-button"]]: true,
          [styles["form__id-check-button--active"]]: watch("id") !== "",
          [styles["form__id-check-button--error"]]: errors?.id !== undefined,
        })}
      >
        중복 확인
      </button>
    </div>
  );
}
