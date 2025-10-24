/**
 * NotificationContextMenu 컴포넌트
 *
 * 알림 우클릭 시 표시되는 컨텍스트 메뉴
 * - 삭제하기 옵션
 * - 클릭 외부 영역 클릭 시 닫기
 */

import { useEffect, useRef } from "react";

interface NotificationContextMenuProps {
  isOpen: boolean;
  position: { x: number; y: number };
  onClose: () => void;
  onDelete: () => void;
}

const NotificationContextMenu = ({
  isOpen,
  position,
  onClose,
  onDelete,
}: NotificationContextMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, onClose]);

  // ESC 키로 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      return () => document.removeEventListener("keydown", handleEsc);
    }
  }, [isOpen, onClose]);

  // 화면 크기 변경 시 닫기
  useEffect(() => {
    const handleResize = () => {
      if (isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <div
      ref={menuRef}
      className="fixed z-[100] bg-white rounded-lg shadow-[0px_4px_16px_0px_rgba(0,0,0,0.2)] p-1"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <button
        type="button"
        onClick={handleDelete}
        className="px-3 py-2 text-center font-medium text-[0.875rem] text-gray-800 hover:bg-red-50 hover:text-red-500 transition-colors duration-150 cursor-pointer rounded whitespace-nowrap"
      >
        삭제하기
      </button>
    </div>
  );
};

export default NotificationContextMenu;
