import { useRef } from "react";
import deleteIcon from "../../../assets/icon/icon_delete.svg";
import plusIcon from "../../../assets/icon/icon_plus.svg";

interface SubImagesUploadProps {
  previews: string[];
  onUpload: (file: File) => void;
  onRemove: (index: number) => void;
  maxImages?: number;
}

const SubImagesUpload = ({
  previews,
  onUpload,
  onRemove,
  maxImages = 4,
}: SubImagesUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
    }
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleBoxClick = () => {
    if (previews.length < maxImages) {
      inputRef.current?.click();
    }
  };

  return (
    <>
      <h2 className="mt-[30px] ty-16_B" style={{ color: "#1F1F22" }}>
        소개 이미지 등록
      </h2>

      <div className="mt-[10px] flex gap-[14px]">
        {/* 업로드 버튼 박스 */}
        <button
          type="button"
          onClick={handleBoxClick}
          disabled={previews.length >= maxImages}
          className="w-32 h-32 sm-mobile:w-20 sm-mobile:h-20 rounded-md flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
          style={{
            border: "1px solid #E0E0E5",
            boxShadow: "0px 2px 6px 0px #00000005",
          }}
        >
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 flex items-center justify-center">
              <img
                src={plusIcon}
                alt=""
                className="w-10 h-10"
                style={{
                  filter:
                    "brightness(0) saturate(100%) invert(66%) sepia(6%) saturate(362%) hue-rotate(201deg) brightness(91%) contrast(89%)",
                }}
              />
            </div>
            <p className="mt-[10px] ty-14_M text-gray-600">
              {previews.length}/{maxImages}
            </p>
          </div>
        </button>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* 미리보기들 */}
        {previews.map((preview, index) => (
          <div
            key={preview}
            className="w-32 h-32 sm-mobile:w-20 sm-mobile:h-20 relative"
            style={{
              border: "1px solid #E0E0E5",
              boxShadow: "0px 2px 6px 0px #00000005",
            }}
          >
            <img
              src={preview}
              alt={`소개 이미지 ${index + 1}`}
              className="w-full h-full object-cover rounded-md"
            />

            {/* 삭제 버튼 */}
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="absolute top-0 right-0 w-[26px] h-[26px] sm-mobile:w-5 sm-mobile:h-5 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
              style={{
                backgroundColor: "#323236",
                transform: "translate(40%, -40%)",
              }}
              aria-label="이미지 삭제"
            >
              <img
                src={deleteIcon}
                alt=""
                className="w-5 h-5 sm-mobile:w-4 sm-mobile:h-4"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default SubImagesUpload;
