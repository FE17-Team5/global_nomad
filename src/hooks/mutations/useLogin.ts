/**
 * useLogin
 *
 * 로그인 mutation 훅
 */

import { useMutation } from "@tanstack/react-query";
import { login } from "../../lib/auth/api";
import type { LoginBody } from "../../lib/auth/types";

export const useLogin = () => {
  return useMutation({
    mutationFn: (body: LoginBody) => login(body),
  });
};
