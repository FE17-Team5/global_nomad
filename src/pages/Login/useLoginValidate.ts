import { useQueryClient } from "@tanstack/react-query";
import { type ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/mutations";
import type { LoginResponse } from "../../lib/auth/types";
import { validateEmail, validatePassword } from "../../utils/validate-regex";

type InputState = {
  email: string;
  password: string;
};

type ReturnType = () => [
  input: InputState,
  error: InputState,
  modalText: string,
  isFormValid: boolean,
  isOpen: boolean,
  handleModalClose: () => void,
  handleInputChage: (e: ChangeEvent<HTMLInputElement>) => void,
  handleInputBlur: (e: ChangeEvent<HTMLInputElement>) => void,
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
];

const useLoginValidate: ReturnType = () => {
  const loginMutation = useLogin();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);
  const [modalText, setModalText] = useState("");

  const [input, setInput] = useState<InputState>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<InputState>({
    email: "",
    password: "",
  });

  const handleModalClose = () => {
    setIsOpen(false);
    setModalText("");
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput((prevInput) => ({
      ...prevInput,
      [e.target.name]: e.target.value,
    }));

    setError((prevError) => ({
      ...prevError,
      [e.target.name]: "",
    }));
  };

  const validateInput = (type: keyof InputState, value: string) => {
    switch (type) {
      case "email":
        if (value.length === 0) return "이메일을 입력해주세요.";
        if (!validateEmail(value)) return "이메일 형식으로 작성해 주세요.";
        return "";
      case "password":
        if (value.length === 0) return "비밀번호를 입력해주세요.";
        if (value.length < 8 || !validatePassword(value))
          return "소문자,대문자,특수문자를 포함한 8자 이상 입력해주세요.";
        return "";
      default:
        return "";
    }
  };

  const handleInputBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const errorMessage = validateInput(name as keyof InputState, value);

    setError((prevError) => ({
      ...prevError,
      [name]: errorMessage,
    }));
  };

  const isFormValid =
    Object.values(input).every((value) => value.length > 0) &&
    Object.values(error).every((value) => value === "");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    loginMutation.mutate(
      {
        email: input.email,
        password: input.password,
      },
      {
        onSuccess: (data: LoginResponse) => {
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);
          // 이전 사용자 캐시 삭제 (새 사용자 정보로 갱신)
          queryClient.removeQueries({ queryKey: ["user", "me"] });
          navigate("/");
        },
        onError: (err: Error) => {
          setIsOpen(true);
          setModalText(
            err.message ? err.message : "알 수 없는 에러가 발생하였습니다.",
          );
        },
      },
    );
  };
  return [
    input,
    error,
    modalText,
    isOpen,
    isFormValid,
    handleModalClose,
    handleInputChange,
    handleInputBlur,
    handleSubmit,
  ];
};

export default useLoginValidate;
