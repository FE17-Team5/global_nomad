/**
 * useMyProfile
 *
 * 내 프로필 정보 조회 훅
 * authToken이 없으면 자동으로 비활성화됨
 */

import { useQuery } from "@tanstack/react-query";
import { getMyProfile } from "../../lib/users/api";

export const useMyProfile = (authToken: string | null | undefined) => {
  return useQuery({
    queryKey: ["user", "me"],
    queryFn: () => getMyProfile(authToken!),
    enabled: !!authToken,
  });
};
