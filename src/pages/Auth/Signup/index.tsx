import styles from "./Signup.module.scss";
import IdInput from "./components/IdInput";

export default function Signup() {
  return (
    <div className={styles.signup}>
      <form action="submit" className={styles.form}>
        <span className={styles.form__title}>회원가입</span>
        <IdInput />
        <label>
          <input type="password" className={styles.form__input} />
        </label>
        <label>
          <input type="password" className={styles.form__input} />
        </label>
      </form>
    </div>
  );
}
