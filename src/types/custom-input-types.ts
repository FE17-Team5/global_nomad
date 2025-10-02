import type React from "react";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  labelText: string;
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
}

export interface CustomInputProps {
  labelProps: LabelProps;
  inputProps: InputProps;
}
