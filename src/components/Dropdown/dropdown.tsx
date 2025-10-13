/**
 * Dropdown 컴포넌트
 *
 * 재사용 가능한 드롭다운 메뉴
 * - 외부 클릭 시 자동 닫힘
 * - ESC 키로 닫기
 * - 커스텀 메뉴 아이템 지원
 */

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

interface DropdownItem {
  label: string;
  onClick: () => void;
}

interface DropdownProps {
  trigger: ReactNode; // 드롭다운을 여는 트리거 요소
  items: DropdownItem[]; // 메뉴 아이템 배열
  align?: "left" | "right"; // 정렬 방향
}

const Dropdown = ({ trigger, items, align = "right" }: DropdownProps) => {
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

  // ESC 키로 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleItemClick = (onClick: () => void) => {
    setIsOpen(false);
    onClick();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* 트리거 버튼 */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            setIsOpen(!isOpen);
          }
        }}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {trigger}
      </div>

      {/* 드롭다운 메뉴 */}
      <div
        className={`absolute top-full mt-2 w-[95px] bg-white rounded-lg shadow-lg z-50 transition-all duration-300 ease-out ${
          align === "left" ? "left-0" : "right-0"
        } ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
        style={{
          border: "1px solid var(--color-border-light)",
        }}
        role="menu"
      >
        {items.map((item, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleItemClick(item.onClick)}
            className={`w-full h-[55px] hover:bg-gray-25 transition-colors flex items-center justify-center ty-14_M text-gray-800 cursor-pointer ${
              index === 0 ? "rounded-t-lg" : ""
            } ${index === items.length - 1 ? "rounded-b-lg" : ""}`}
            role="menuitem"
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
