import CustomInput from "../Common/custom-input";

const EditProfile = () => {
  return (
    <form className="flex flex-col gap-7 mobile:gap-6">
      <CustomInput
        labelProps={{ labelText: "닉네임" }}
        inputProps={{
          id: "nickname",
          name: "nickname",
          type: "text",
          placeholder: "닉네임을 입력해 주세요",
        }}
      />
      <CustomInput
        labelProps={{ labelText: "이메일" }}
        inputProps={{
          id: "email",
          name: "email",
          type: "email",
          placeholder: "이메일을 입력해 주세요",
        }}
      />
      <CustomInput
        labelProps={{ labelText: "비밀번호" }}
        inputProps={{
          id: "password",
          name: "password",
          type: "password",
          placeholder: "비밀번호를 입력해 주세요",
        }}
      />
      <CustomInput
        labelProps={{ labelText: "비밀번호 확인" }}
        inputProps={{
          id: "validPassword",
          name: "validPassword",
          type: "password",
          placeholder: "비밀번호를 한번 더 입력해 주세요",
        }}
      />
      <div className="flex justify-center gap-3">
        <button
          disabled={true}
          className="hidden grow px-[40px] py-3.5 rounded-[14px] border border-gray-200 ty-16_M text-gray-600 mobile:block"
        >
          취소하기
        </button>
        <button
          disabled={true}
          className={`px-[40px] py-3 rounded-xl ty-16_B ${
            false
              ? "cursor-pointer bg-primary-500 text-white"
              : "bg-gray-200 text-gray-50"
          } mobile:grow mobile:py-3.5 mobile:rounded-[14px]`}
        >
          저장하기
        </button>
      </div>
    </form>
  );
};

export default EditProfile;
