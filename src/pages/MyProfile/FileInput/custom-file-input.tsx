import { useEffect, useRef, useState, type ChangeEvent } from "react";
import defaultImage from "../../../assets/atc/default_profile.svg";
import { useMyProfile } from "../../../hooks/queries";
import { uploadProfileImage } from "../../../lib/users/api";
import { useUpdateMyProfile } from "../../../hooks/mutations";

const CustomFileInput = () => {
  const accessToken = localStorage.getItem("accessToken");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileImage, setFileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState(defaultImage);
  const { data: user, isLoading } = useMyProfile(accessToken);
  const imageMutation = useUpdateMyProfile(accessToken!);

  const handleFileClick = () => {
    if (!fileInputRef.current) return;
    fileInputRef.current.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0] ?? defaultImage;

    if (!file) {
      setFileImage(null);
      setPreviewImage(user?.profileImageUrl ?? defaultImage);
      return;
    }

    setFileImage(file);
    const fileImageUrl = URL.createObjectURL(file);
    setPreviewImage(fileImageUrl);
  };

  const handleCancel = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setFileImage(null);
    setPreviewImage(user?.profileImageUrl ?? defaultImage);
  };

  const handleFileUpload = async () => {
    if (fileImage) {
      try {
        const { profileImageUrl } = await uploadProfileImage(
          fileImage,
          accessToken!
        );
        imageMutation.mutate({ profileImageUrl });
        setFileImage(null);
        setPreviewImage(profileImageUrl);
      } catch (error) {
        console.error("프로필 이미지 저장 실패:", error);
      }
    }
  };

  useEffect(() => {
    if (!isLoading && previewImage === defaultImage) {
      setPreviewImage(user?.profileImageUrl ?? defaultImage);
    }
    if (
      previewImage !== defaultImage &&
      previewImage !== user?.profileImageUrl
    ) {
      return () => {
        URL.revokeObjectURL(previewImage);
      };
    }
    setPreviewImage(user?.profileImageUrl ?? defaultImage);
  }, [user?.profileImageUrl, previewImage, isLoading]);

  if (isLoading) {
    return (
      <div className="flex-col-center gap-4">
        <div className="w-[120px] h-[120px] rounded-[100px] bg-gray-200 tablet:w-[70px] tablet:h-[70px] mobile:w-[120px] mobile:h-[120px]" />
      </div>
    );
  }

  return (
    <div className="flex-col-center gap-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <button
        type="button"
        onClick={handleFileClick}
        className="max-w-[120px] relative cursor-pointer"
      >
        <img
          src={previewImage}
          alt="이미지"
          width={120}
          height={120}
          className="w-full max-w-[120px] tablet:max-w-[70px] mobile:max-w-[120px] rounded-[100px] aspect-square bg-center bg-no-repeat"
        />
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute w-[30px] h-[30px] p-1.5 bg-gray-300 text-white
          rounded-[100px] z-10 right-0 bottom-0 tablet:w-[24px] tablet:h-[24px] mobile:w-[30px] mobile:h-[30px]"
        >
          <path
            d="M16 2.01172L19 5.01172L16.713 7.29972L13.713 4.29972L16 2.01172ZM4 13.9997V16.9997H7L15.299 8.71272L12.299 5.71272L4 13.9997ZM4 19.9997H20V21.9997H4V19.9997Z"
            fill="currentColor"
          />
        </svg>
      </button>
      <div className="flex gap-4">
        <button
          type="button"
          onClick={handleCancel}
          className={`${
            previewImage === user?.profileImageUrl && "hidden"
          } p-2 rounded-[8px] hover:bg-primary-100 cursor-pointer`}
        >
          취소
        </button>
        <button
          onClick={handleFileUpload}
          type="button"
          className={`${
            previewImage === user?.profileImageUrl && "hidden"
          } p-2 rounded-[8px] hover:bg-primary-100 cursor-pointer`}
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default CustomFileInput;
