const ERROR_MESSAGE = {
  password:
    "비밀번호는 문자, 숫자, 특수문자를 포함한 8~16자리로 이루어져야합니다.",
  passwordCheck: "비밀번호가 일치하지 않습니다.",
};

export interface SignUpFormData {
  id: string;
  password: string;
  passwordCheck: string;
}

export { ERROR_MESSAGE };
