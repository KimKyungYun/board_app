import styles from "./Signup.module.scss";
import IdInput from "./components/IdInput";
import PasswordInput from "./components/PasswordInput";
import PasswordCheckInput from "./components/PasswordCheckInput";
import { FormProvider,useForm } from "react-hook-form";
import { SignUpFormData } from "./static/signUp";

export default function Signup() {
  const methods = useForm<SignUpFormData>({
    mode: 'onChange',
    defaultValues: {
      id: '',
      password: '',
      passwordCheck: '',
    },
  });
  return (
    <div className={styles.signup}>
      <FormProvider {...methods}>
      <form action="submit" className={styles.form}>
        <span className={styles.form__title}>회원가입</span>
        <IdInput />
        <PasswordInput />
        <PasswordCheckInput />
      </form>
      </FormProvider>
    </div>
  );
}
