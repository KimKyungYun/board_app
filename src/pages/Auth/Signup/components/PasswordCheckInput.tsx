import React from 'react';
import cn from 'utils/ts/className';
import { ReactComponent as ErrorIcon } from 'assets/Icon/error.svg';
import { useFormContext } from 'react-hook-form';
import { ERROR_MESSAGE } from 'pages/Auth/Signup/static/signUp';
import styles from '../Signup.module.scss';
import { SignUpFormData } from '../static/signUp';

export default function PasswordCheckInput() {
  const { register, watch, formState: { errors } } = useFormContext<SignUpFormData>();


  return (
    <div className={styles.form__form}>
      <label className={styles.form__label} htmlFor="password-check-input">
        비밀번호 확인
        <div className={styles.form__error} role="alert">
          <ErrorIcon
            className={cn({
              [styles['form__error-icon']]: true,
              [styles['form__error-icon--active']]:
                errors?.passwordCheck !== undefined,
            })}
            aria-hidden
          />
          {errors.passwordCheck?.message}
        </div>
      </label>
      <input
        placeholder="비밀번호를 다시 입력하세요"
        id="password-check-input"
        type='password'
        className={cn({
          [styles.form__input]: true,
          [styles['form__input--error']]: errors?.passwordCheck !== undefined,
        })}
        {...register('passwordCheck', {
          required: ERROR_MESSAGE.passwordCheck,
          validate: {
            checkPw: (v) => v === watch('password') || ERROR_MESSAGE.passwordCheck,
          },
        })}
      />
    </div>
  );
}
