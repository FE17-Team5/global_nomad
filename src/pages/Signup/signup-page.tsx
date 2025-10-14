import { Link } from "react-router-dom";
import logoImage from "../../assets/atc/logo.svg";
import kakaoLogoImage from "../../assets/icon/icon_kakao.svg";
import CustomInput from "../../components/Common/custom-input";
import useSignupValidate from "./useSignupValidate";
import { Modal } from "../../components/Modal";

const SignupPage = () => {
  const [
    input,
    error,
    modalText,
    isOpen,
    isFormValid,
    handleModalClose,
    handleInputChange,
    handleInputBlur,
    handleSubmit,
  ] = useSignupValidate();

  return (
    <div className="h-dvh flex-col-center mobile:px-[24px]">
      <div className="w-full max-w-[640px] flex flex-col gap-[62px] mobile:gap-[42px]">
        <div className="flex-col-center">
          <Link to={"/"} className="flex-col-center gap-6">
            <img
              src={logoImage}
              alt="logo"
              width={144}
              height={144}
              className="w-36 h-36"
            />
            <h3 className="text-32 leading-8 font-bold mobile:hidden">
              GlobalNomad
            </h3>
          </Link>
        </div>
        <div className="flex flex-col gap-7 mobile:gap-6">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-7 mobile:gap-6"
          >
            <CustomInput
              labelProps={{ labelText: "이메일" }}
              inputProps={{
                value: input.email,
                onChange: handleInputChange,
                id: "email",
                name: "email",
                type: "email",
                placeholder: "이메일을 입력해 주세요",
                onBlur: handleInputBlur,
              }}
              isError={!!error.email}
              errorText={error.email}
            />
            <CustomInput
              labelProps={{ labelText: "닉네임" }}
              inputProps={{
                value: input.nickname,
                onChange: handleInputChange,
                id: "nickname",
                name: "nickname",
                type: "text",
                placeholder: "닉네임을 입력해 주세요",
                onBlur: handleInputBlur,
              }}
              isError={!!error.nickname}
              errorText={error.nickname}
            />
            <CustomInput
              labelProps={{ labelText: "비밀번호" }}
              inputProps={{
                value: input.password,
                onChange: handleInputChange,
                id: "password",
                name: "password",
                type: "password",
                placeholder: "비밀번호를 입력해 주세요",
                onBlur: handleInputBlur,
              }}
              isError={!!error.password}
              errorText={error.password}
            />
            <CustomInput
              labelProps={{ labelText: "비밀번호 확인" }}
              inputProps={{
                value: input.validPassword,
                onChange: handleInputChange,
                id: "validPassword",
                name: "validPassword",
                type: "password",
                placeholder: "비밀번호를 한번 더 입력해 주세요",
                onBlur: handleInputBlur,
              }}
              isError={!!error.validPassword}
              errorText={error.validPassword}
            />
            <button
              type="submit"
              disabled={!isFormValid}
              className={`h-[54px] rounded-2xl ${
                isFormValid
                  ? "cursor-pointer bg-primary-500 text-white"
                  : "bg-gray-200 text-gray-50"
              }`}
            >
              회원가입하기
            </button>
          </form>
          <div className="flex items-center gap-3.5">
            <div className="h-px grow border-t border-gray-100"></div>
            <div className="ty-16_M text-gray-2">SNS 계정으로 회원가입하기</div>
            <div className="h-px grow border-t border-gray-100"></div>
          </div>
          <button
            type="button"
            className="w-full h-[54px] flex justify-center items-center border border-gray-200 gap-1 rounded-2xl cursor-pointer"
          >
            <img src={kakaoLogoImage} alt="kakao_logo" width={24} height={24} />
            <span className="ty-16_M text-gray-600">카카오 로그인</span>
          </button>
          <div className="flex justify-center gap-1">
            <span className="ty-16_M text-gray-400">회원이신가요?</span>
            <span className="ty-16_M text-gray-400 cursor-pointer underline">
              <Link to={"/login"}>로그인하기</Link>
            </span>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={handleModalClose} message={modalText} />
    </div>
  );
};

export default SignupPage;
