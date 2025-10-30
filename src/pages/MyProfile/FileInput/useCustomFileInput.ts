import { useEffect, useRef, useState, type ChangeEvent } from "react";
import defaultImage from "../../../assets/atc/default_profile.svg";
import { useMyProfile } from "../../../hooks/queries";
import { uploadProfileImage } from "../../../lib/users/api";
import { useUpdateMyProfile } from "../../../hooks/mutations";
import type { User } from "../../../lib/users/types";

type CustomFileInputType = () => [
  user: User | undefined,
  isLoading: boolean,
  previewImage: string,
  fileInputRef: React.RefObject<HTMLInputElement | null>,
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void,
  handleFileClick: () => void,
  handleCancel: () => void,
  handleFileUpload: () => void
];

export const useCustomFileInput: CustomFileInputType = () => {
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

  return [
    user,
    isLoading,
    previewImage,
    fileInputRef,
    handleFileChange,
    handleFileClick,
    handleCancel,
    handleFileUpload,
  ];
};
