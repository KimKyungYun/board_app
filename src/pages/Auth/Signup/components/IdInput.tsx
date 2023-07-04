import cn from "utils/ts/className";
import { ReactComponent as ErrorIcon } from "assets/Icon/error.svg";
import styles from "../Signup.module.scss";

export default function IdInput() {
  return (
    <div className={styles.form__form}>
      <label className={styles.form__label} htmlFor="id-input">
        아이디
        <div className={styles.form__error} role="alert">
          <ErrorIcon
            className={cn({
              [styles["form__error-icon"]]: true,
            })}
            aria-hidden
          />
        </div>
      </label>
      <input
        placeholder="아이디를 입력하세요"
        id="id-input"
        // TODO: 아이디 중복확인 기능
      />
      <button type="button" className={cn({})}>
        중복 확인
      </button>
    </div>
  );
}
