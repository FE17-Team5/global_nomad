import { useEffect, useState, type ChangeEvent } from "react";
import { useMyProfile } from "../../hooks/queries";
import { useUpdateMyProfile } from "../../hooks/mutations";
import { validatePassword } from "../../utils/validate-regex";
import { useQueryClient } from "@tanstack/react-query";

type InputState = {
  email: string;
  nickname: string;
  password: string;
  validatePassword: string;
};

type ReturnType = () => [
  input: InputState,
  error: InputState,
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void,
  hanldeSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
  handleInitData: () => void
];

const useUpdateUserInfo: ReturnType = () => {
  const accessToken = localStorage.getItem("accessToken");
  const { data: user, isSuccess } = useMyProfile(accessToken);
  const userMutation = useUpdateMyProfile(accessToken!);
  const queryClient = useQueryClient();

  const [error, setError] = useState({
    email: "",
    nickname: "",
    password: "",
    validatePassword: "",
  });

  const [input, setInput] = useState({
    email: "",
    nickname: "",
    password: "",
    validatePassword: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleInitData = () => {
    setInput({
      email: user!.email,
      nickname: user!.nickname,
      password: "",
      validatePassword: "",
    });
  };

  const validateInput = (type: keyof InputState, value: string) => {
    switch (type) {
      case "nickname":
        if (value.length === 0) return "닉네임을 입력해 주세요.";
        if (value.length > 10) return "열 자 이하로 작성해주세요.";
        return "";
      case "password":
        if (value.length === 0) return "비밀번호를 입력해주세요.";
        if (value.length < 8 || !validatePassword(value))
          return "소문자,대문자,특수문자를 포함한 8자 이상 입력해주세요.";
        return "";
      case "validatePassword":
        if (value.length === 0) return "비밀번호 확인을 입력해주세요.";
        if (value.length < 8) return "8자 이상 입력해주세요.";
        if (value !== input.password) return "비밀번호가 일치하지 않습니다.";
        return "";
      default:
        return "";
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) return;

    let hasError = false;
    const newError = {
      email: "",
      nickname: "",
      password: "",
      validatePassword: "",
    };

    newError.nickname = validateInput("nickname", input.nickname);
    if (newError.nickname) hasError = true;

    const isPasswordAttempted = !!input.password || !!input.validatePassword;

    if (isPasswordAttempted) {
      newError.password = validateInput("password", input.password);
      newError.validatePassword = validateInput(
        "validatePassword",
        input.validatePassword
      );

      if (newError.password || newError.validatePassword) hasError = true;
    }

    if (hasError) {
      setError(newError);
      return;
    }

    const isNicknameChanged = input.nickname !== user.nickname;

    const isPasswordProvided =
      !!input.password &&
      !!input.validatePassword &&
      !newError.password &&
      !newError.validatePassword;

    if (!isNicknameChanged && !isPasswordProvided) {
      alert("변경할 내용이 없습니다.");
      return;
    }

    userMutation.mutate(
      {
        nickname: input.nickname ? input.nickname : undefined,
        newPassword: input.password ? input.password : undefined,
      },
      {
        onSuccess: () => {
          setInput((prevInput) => ({
            ...prevInput,
            password: "",
            validatePassword: "",
          }));
          setError({
            email: "",
            nickname: "",
            password: "",
            validatePassword: "",
          });
          queryClient.invalidateQueries({ queryKey: ["user", "me"] });
        },
      }
    );
  };

  useEffect(() => {
    if (isSuccess) {
      setInput((prevInput) => ({
        ...prevInput,
        email: user.email,
        nickname: user.nickname,
      }));
    }
  }, [isSuccess, user]);

  return [input, error, handleInputChange, handleSubmit, handleInitData];
};

export default useUpdateUserInfo;
