import { apiFetch, TEAM_ID } from "../apiClient";
import type {
  SignUpBody,
  SignUpResponse,
  UpdateMyProfileBody,
  UploadProfileImageResponse,
  User,
} from "./types";

// 회원가입
export async function signUp(body: SignUpBody): Promise<SignUpResponse> {
  return apiFetch<SignUpResponse>(`/users`, {
    method: "POST",
    body,
  });
}

// 내 정보 조회
export async function getMyProfile(authToken: string): Promise<User> {
  return apiFetch<User>(`/users/me`, {
    authToken,
  });
}

// 내 정보 수정
export async function updateMyProfile(
  body: UpdateMyProfileBody,
  authToken: string,
): Promise<User> {
  return apiFetch<User>(`/users/me`, {
    method: "PATCH",
    body,
    authToken,
  });
}

// 프로필 이미지 업로드
export async function uploadProfileImage(
  imageFile: File,
  authToken: string,
): Promise<UploadProfileImageResponse> {
  const formData = new FormData();
  formData.append("image", imageFile);

  return apiFetch<UploadProfileImageResponse>(`/users/me/image`, {
    method: "POST",
    body: formData,
    authToken,
  });
}
