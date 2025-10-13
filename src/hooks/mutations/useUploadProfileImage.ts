/**
 * useUploadProfileImage
 *
 * 프로필 이미지 업로드 mutation 훅
 */

import { useMutation } from "@tanstack/react-query";
import { uploadProfileImage } from "../../lib/users/api";

export const useUploadProfileImage = (authToken: string) => {
  return useMutation({
    mutationFn: (imageFile: File) => uploadProfileImage(imageFile, authToken),
  });
};
