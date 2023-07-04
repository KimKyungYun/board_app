import styles from "./Signup.module.scss";

export default function Signup() {
  return (
    <div className={styles.signup}>
      <form action="submit" className={styles.form}>
        <span className={styles.form__title}>회원가입</span>
        <label>
          <input type="text" className={styles.form__input} />
        </label>
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
