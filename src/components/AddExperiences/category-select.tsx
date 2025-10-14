import { useEffect, useRef, useState } from "react";
import arrowDownIcon from "../../assets/icon/icon_alt arrow_down.svg";

interface CategorySelectProps {
  value: string;
  onChange: (category: string) => void;
  categories: string[];
}

const CategorySelect = ({
  value,
  onChange,
  categories,
}: CategorySelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (category: string) => {
    onChange(category);
    setIsOpen(false);
  };

  return (
    <div className="mt-6 relative" ref={dropdownRef}>
      <div className="ty-16_B block" style={{ color: "#1F1F22" }}>
        카테고리
      </div>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-[54px] mt-[10px] px-5 rounded-md ty-16_M text-left flex items-center justify-between"
        style={{
          color: value ? "#1F1F22" : "#9FA0A7",
          border: "1px solid #E0E0E5",
          boxShadow: "0px 2px 6px 0px #00000005",
        }}
      >
        <span>{value || "카테고리를 선택해 주세요"}</span>
        <img
          src={arrowDownIcon}
          alt=""
          className="w-6 h-6"
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
          }}
        />
      </button>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div
          className="absolute top-full left-0 right-0 mt-2 rounded-md bg-white z-10"
          style={{
            height: "280px",
            padding: "12px",
            border: "1px solid #E0E0E5",
            boxShadow: "0px 2px 6px 0px #00000005",
            overflowY: "auto",
          }}
        >
          <div className="flex flex-col gap-1">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => handleSelect(category)}
                className="w-full h-12 px-4 rounded ty-16_M text-left transition-colors"
                style={{
                  color: "#323236",
                  backgroundColor:
                    value === category ? "#E5F3FF" : "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#E5F3FF";
                }}
                onMouseLeave={(e) => {
                  if (value !== category) {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategorySelect;
