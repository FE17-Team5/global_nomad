/**
 * useSignUp
 *
 * 회원가입 mutation 훅
 */

import { useMutation } from "@tanstack/react-query";
import { signUp } from "../../lib/users/api";
import type { SignUpBody } from "../../lib/users/types";

export const useSignUp = () => {
  return useMutation({
    mutationFn: (body: SignUpBody) => signUp(body),
  });
};
