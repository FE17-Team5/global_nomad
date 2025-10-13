/**
 * useUploadActivityImage
 *
 * 체험 이미지 업로드 mutation 훅
 */

import { useMutation } from "@tanstack/react-query";
import { uploadActivityImage } from "../../lib/activities/api";

export const useUploadActivityImage = (authToken: string) => {
  return useMutation({
    mutationFn: (imageFile: File) => uploadActivityImage(imageFile, authToken),
  });
};
