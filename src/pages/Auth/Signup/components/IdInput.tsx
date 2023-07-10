import { ReactComponent as ErrorIcon } from "assets/Icon/error.svg";
import styles from "../Signup.module.scss";
import { ERROR_MESSAGE } from "../static/signUp";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import cn from "utils/ts/className";
import { useFormContext } from "react-hook-form";
import { SignUpFormData } from "../static/signUp";
import { checkIdDuplicate } from "api/user";
import IdIcon from "assets/png/login_logo.png";

const useIdCheckServer = (id: string) => {
  const { status } = useQuery(
    ["idDuplicate", id],
    ({ queryKey: [, account] }) => checkIdDuplicate({ account }),
    {
      enabled: id !== "",
    }
  );

  return status;
};

const useIdDuplicateCheck = () => {
  const [currentCheckedId, setCurrentCheckedId] = useState("");
  const { getValues, trigger } = useFormContext<SignUpFormData>();
  const id = getValues("id");

  const handleCheckIdDuplicate = () => {
    setCurrentCheckedId(id);
  };

  const status = useIdCheckServer(currentCheckedId);

  useEffect(() => {
    if (id && id === currentCheckedId) trigger("id");
  }, [trigger, currentCheckedId, id, status]);

  return { status, handleCheckIdDuplicate, currentCheckedId };
};

export default function IdInput() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<SignUpFormData>();
  const { status, handleCheckIdDuplicate, currentCheckedId } =
    useIdDuplicateCheck();

  return (
    <div className={styles.form__form}>
      <label className={styles.form__label} htmlFor="id-input">
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
      <div className={styles.form__container}>
        <img src={IdIcon} alt="" className={styles["form__logo"]} />
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
              checkValid: (val) =>
                val === currentCheckedId || "아이디 중복확인을 해주세요.",
              checkLoading: () => status !== "loading" || "중복 확인중입니다.",
            },
          })}
        />
      </div>
      <button
        type="button"
        className={cn({
          [styles["form__id-check-button"]]: true,
          [styles["form__id-check-button--active"]]: watch("id") !== "",
          [styles["form__id-check-button--error"]]: errors?.id !== undefined,
        })}
        onClick={handleCheckIdDuplicate}
      >
        중복 확인
      </button>
    </div>
  );
}
