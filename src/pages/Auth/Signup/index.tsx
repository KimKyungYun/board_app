import styles from "./Signup.module.scss";
import IdInput from "./components/IdInput";
import PasswordInput from "./components/PasswordInput";
import PasswordCheckInput from "./components/PasswordCheckInput";
import { FormProvider, useForm } from "react-hook-form";
import { SignUpFormData } from "./static/signUp";
import { useNavigate } from "react-router-dom";
import { register } from "api/user";

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
          <span className={styles.form__title}>회원가입</span>
          <IdInput />
          <PasswordInput />
          <PasswordCheckInput />
          <button
            className={styles["form__submit"]}
            disabled={!isValid || !isDirty}
          >
            회원가입
          </button>
        </form>
      </FormProvider>
    </div>
  );
}
