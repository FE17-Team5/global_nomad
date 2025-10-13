import type React from "react";
import { useState } from "react";

export function useVisible(
  inputType: React.HTMLInputTypeAttribute = "text",
): [
  type: React.HTMLInputTypeAttribute,
  isVisible: boolean,
  handleVisibleButtonClick: () => void,
] {
  const [type, setType] = useState(inputType);
  const [isVisible, setIsVisible] = useState(false);

  function handleVisibleButtonClick() {
    setIsVisible(!isVisible);

    type === "password" ? setType("text") : setType("password");
  }

  return [type, isVisible, handleVisibleButtonClick];
}
