import { apiFetch, TEAM_ID } from "../apiClient";
import type {
  SignUpBody,
  SignUpResponse,
  User,
  UpdateMyProfileBody,
  UploadProfileImageResponse,
} from "./types";

// 회원가입
export async function signUp(body: SignUpBody): Promise<SignUpResponse> {
  return apiFetch<SignUpResponse>(`/${TEAM_ID}/users`, {
    method: "POST",
    body,
  });
}

// 내 정보 조회
export async function getMyProfile(authToken: string): Promise<User> {
  return apiFetch<User>(`/${TEAM_ID}/users/me`, {
    authToken,
  });
}

// 내 정보 수정
export async function updateMyProfile(
  body: UpdateMyProfileBody,
  authToken: string,
): Promise<User> {
  return apiFetch<User>(`/${TEAM_ID}/users/me`, {
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

  return apiFetch<UploadProfileImageResponse>(`/${TEAM_ID}/users/me/image`, {
    method: "POST",
    body: formData,
    authToken,
  });
}
