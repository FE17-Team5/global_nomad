import { useVisible } from "../../hooks/visible-btn-hook";
import type { CustomInputProps } from "../../types/custom-input-types";
import visibleIcon from "../../assets/icon/icon_visible.svg";
import invisibleIcon from "../../assets/icon/icon_invisible.svg";

const CustomInput = ({
  labelProps,
  inputProps,
  isError,
  errorText,
}: CustomInputProps & {
  isError?: boolean;
  errorText?: string;
}) => {
  const { labelText, ...restLabelProps } = labelProps;
  const { type: initType, ...restInputProps } = inputProps;
  const [type, isVisible, handleVisibleButtonClick] = useVisible(initType);

  return (
    <div className="flex flex-col gap-2.5">
      <label
        htmlFor={inputProps.id}
        {...restLabelProps}
        className={`ty-16_M ${labelProps.className}`}
      >
        {labelText}
      </label>
      <div className="flex flex-col gap-1.5">
        <div className="relative">
          <input
            type={type}
            autoComplete="off"
            maxLength={30}
            {...restInputProps}
            className={`w-full h-[54px] px-[20px] py-[16px] pr-12 border ${
              isError ? "border-red-500" : "border-gray-100"
            } rounded-2xl placeholder:text-16 placeholder:font-medium ${
              inputProps.className
            }`}
          />
          {inputProps.type === "password" && (
            <button
              className="absolute z-10 right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              type="button"
              onClick={handleVisibleButtonClick}
            >
              <img
                src={isVisible ? visibleIcon : invisibleIcon}
                alt="visible-icon"
              />
            </button>
          )}
        </div>

        {isError && (
          <div className="pl-1 ty-12_M text-red-500">{errorText}</div>
        )}
      </div>
    </div>
  );
};

export default CustomInput;
