import { useRef } from "react";
import defaultImage from "../../../assets/atc/default_profile.svg";

const CustomFileInput = ({ src }: { src?: string }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileClick = () => {
    if (!fileInputRef.current) return;
    fileInputRef.current.click();
  };

  return (
    <div className="flex justify-center">
      <input type="file" ref={fileInputRef} className="hidden" />
      <div
        onClick={handleFileClick}
        className="max-w-[120px] relative cursor-pointer"
      >
        <img
          src={src ? src : defaultImage}
          alt="image"
          width={120}
          height={120}
          className="w-full max-w-[120px] tablet:max-w-[70px] mobile:max-w-[120px]"
        />
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute w-[30px] h-[30px] p-1.5 bg-gray-300 text-white
          rounded-[100px] z-10 right-0 bottom-0 tablet:w-[24px] tablet:h-[24px] mobile:w-[30px] mobile:h-[30px]"
        >
          <path
            d="M16 2.01172L19 5.01172L16.713 7.29972L13.713 4.29972L16 2.01172ZM4 13.9997V16.9997H7L15.299 8.71272L12.299 5.71272L4 13.9997ZM4 19.9997H20V21.9997H4V19.9997Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
};

export default CustomFileInput;
