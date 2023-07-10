import styles from "./Signup.module.scss";
import IdInput from "./components/IdInput";
import PasswordInput from "./components/PasswordInput";
import PasswordCheckInput from "./components/PasswordCheckInput";
import { FormProvider, useForm } from "react-hook-form";
import { SignUpFormData } from "./static/signUp";
import { useNavigate } from "react-router-dom";
import { register } from "api/user";
import JKLogo from "assets/png/company.png";

const useSignUp = () => {
  const navigate = useNavigate();
  const signup = (form: SignUpFormData) => {
    register({
      username: form.id,
      password: form.password,
    })
      .then(() => {
        navigate("/login", {
          state: { signUpCheck: true },
          replace: true,
        });
      })
      .catch();
  };

  return signup;
};
export default function Signup() {
  const methods = useForm<SignUpFormData>({
    mode: "onChange",
    defaultValues: {
      id: "",
      password: "",
      passwordCheck: "",
    },
  });
  const {
    handleSubmit,
    formState: { isDirty, isValid },
  } = methods;

  const signup = useSignUp();

  return (
    <div className={styles.signup}>
      <FormProvider {...methods}>
        <form
          action="submit"
          className={styles.form}
          onSubmit={handleSubmit(signup)}
        >
          <span className={styles.form__title}>
            <img src={JKLogo} alt="" className={styles['form__title--logo']}/>
            회원가입
          </span>
          <IdInput />
          <PasswordInput />
          <PasswordCheckInput />
          <div className={styles.form__submit}>
            <span className={styles["form__submit--text"]}>
              아래 [동의하고 가입하기 버튼을 클릭하면,
              <br />
              이용약관 및 개인정보취급방침에 동의하게 됩니다.
            </span>
            <button
              className={styles["form__submit--signup"]}
              disabled={!isValid || !isDirty}
            >
              동의하고 가입하기
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
