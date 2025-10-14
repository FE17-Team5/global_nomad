import { useState, type ChangeEvent } from "react";
import { useSignUp } from "../../hooks/mutations";
import { validateEmail, validatePassword } from "../../utils/validate-regex";
import { useNavigate } from "react-router-dom";

type InputState = {
  email: string;
  nickname: string;
  password: string;
  validPassword: string;
};

type returnType = () => [
  input: InputState,
  error: InputState,
  modalText: string,
  isFormValid: boolean,
  isOpen: boolean,
  handleModalClose: () => void,
  handleInputChage: (e: ChangeEvent<HTMLInputElement>) => void,
  handleInputBlur: (e: ChangeEvent<HTMLInputElement>) => void,
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
];

const useSignupValidate: returnType = () => {
  const signUpMutation = useSignUp();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [isSuccessModal, setIsSuccessModal] = useState(false);

  const [input, setInput] = useState<InputState>({
    email: "",
    nickname: "",
    password: "",
    validPassword: "",
  });
  const [error, setError] = useState<InputState>({
    email: "",
    nickname: "",
    password: "",
    validPassword: "",
  });

  const handleModalClose = () => {
    setIsOpen(false);
    setModalText("");

    if (isSuccessModal) {
      setIsSuccessModal(false);
      navigate("/login");
    }
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
      case "nickname":
        if (value.length === 0) return "닉네임을 입력해 주세요.";
        if (value.length > 10) return "열 자 이하로 작성해주세요.";
        return "";
      case "password":
        if (value.length === 0) return "비밀번호를 입력해주세요.";
        if (value.length < 8 || !validatePassword(value))
          return "소문자,대문자,특수문자를 포함한 8자 이상 입력해주세요.";
        return "";
      case "validPassword":
        if (value.length === 0) return "비밀번호 확인을 입력해주세요.";
        if (value.length < 8) return "8자 이상 입력해주세요.";
        if (value !== input.password) return "비밀번호가 일치하지 않습니다.";
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
    Object.values(error).every((value) => value === "") &&
    input.password === input.validPassword;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signUpMutation.mutate(
      {
        email: input.email,
        nickname: input.nickname,
        password: input.password,
      },
      {
        onSuccess: () => {
          setIsSuccessModal(true);
          setIsOpen(true);
          setModalText("가입이 완료되었습니다.");
        },
        onError: (err: Error) => {
          setIsOpen(true);
          setModalText(
            err.message ? err.message : "알 수 없는 에러가 발생하였습니다."
          );
        },
      }
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

export default useSignupValidate;
