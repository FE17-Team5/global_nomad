import CustomInput from "../Common/custom-input";
import { Modal } from "../Modal";
import useUpdateUserInfo from "./useUpdateUserInfo";

const EditProfile = ({ onClick }: { onClick: () => void }) => {
  const [
    input,
    error,
    isOpen,
    handleInputChange,
    handleSubmit,
    handleInitData,
    handleModalClose,
  ] = useUpdateUserInfo();

  return (
    <>
      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col gap-7 mobile:gap-6"
      >
        <CustomInput
          labelProps={{ labelText: "이메일" }}
          inputProps={{
            value: input.email,
            readOnly: true,
            id: "email",
            name: "email",
            type: "email",
            placeholder: "이메일을 입력해 주세요",
          }}
        />
        <CustomInput
          labelProps={{ labelText: "닉네임 변경" }}
          inputProps={{
            value: input.nickname,
            id: "nickname",
            name: "nickname",
            type: "text",
            placeholder: "닉네임을 입력해 주세요",
            onChange: handleInputChange,
          }}
          isError={!!error.nickname}
          errorText={error.nickname}
        />
        <CustomInput
          labelProps={{ labelText: "비밀번호 변경" }}
          inputProps={{
            value: input.password,
            id: "password",
            name: "password",
            type: "password",
            placeholder: "변경할 비밀번호를 입력해 주세요",
            onChange: handleInputChange,
          }}
          isError={!!error.password}
          errorText={error.password}
        />
        <CustomInput
          labelProps={{ labelText: "비밀번호 확인" }}
          inputProps={{
            value: input.validatePassword,
            id: "validatePassword",
            name: "validatePassword",
            type: "password",
            placeholder: "비밀번호를 한번 더 입력해 주세요",
            onChange: handleInputChange,
          }}
          isError={!!error.validatePassword}
          errorText={error.validatePassword}
        />
        <div className="flex justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              handleInitData();
              onClick();
            }}
            className="hidden grow px-[40px] py-3.5 rounded-[14px] border border-gray-200 ty-16_M text-gray-600 mobile:block cursor-pointer"
          >
            취소하기
          </button>
          <button
            type="submit"
            className={`px-[40px] py-3 rounded-xl ty-16_B cursor-pointer bg-primary-500 text-white
           mobile:grow mobile:py-3.5 mobile:rounded-[14px]`}
          >
            저장하기
          </button>
        </div>
      </form>
      <Modal
        isOpen={isOpen}
        onClose={handleModalClose}
        message="변경되었습니다."
      />
    </>
  );
};

export default EditProfile;
