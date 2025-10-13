/**
 * useUpdateMyProfile
 *
 * 내 프로필 수정 mutation 훅
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMyProfile } from "../../lib/users/api";
import type { UpdateMyProfileBody } from "../../lib/users/types";

export const useUpdateMyProfile = (authToken: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: UpdateMyProfileBody) => updateMyProfile(body, authToken),
    onSuccess: () => {
      // 프로필 정보 갱신
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
    },
  });
};
