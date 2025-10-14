/**
 * Modal 컴포넌트
 *
 * 범용 모달 컴포넌트
 * - 중앙 정렬
 * - 외부 영역 어두운 배경 (#00000080)
 * - 반응형 (데스크탑/태블릿, 모바일)
 * - 확인 버튼
 */

import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const Modal = ({ isOpen, onClose, message }: ModalProps) => {
  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden"; // 스크롤 잠금
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-6"
      style={{ backgroundColor: "#00000080" }}
      onClick={onClose} // 외부 클릭 시 닫기
    >
      {/* 모달 창 */}
      <div
        className="modal-container bg-white rounded-3xl flex flex-col items-center w-full max-w-[400px] h-[170px] sm-mobile:max-w-[320px] sm-mobile:h-[140px] pt-[46px] pb-9"
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 이벤트 전파 방지
      >
        {/* 텍스트 박스 */}
        <div className="text-center ty-18_B sm-mobile:ty-16_B text-black">
          {message}
        </div>

        {/* 간격 (PC/태블릿: 20px, 모바일: 16px) */}
        <div className="h-5 sm-mobile:h-4" />

        {/* 확인 버튼 */}
        <button
          type="button"
          onClick={onClose}
          className="w-full max-w-[200px] h-[47px] sm-mobile:h-[41px] rounded-lg ty-16_B sm-mobile:ty-14_B bg-primary-500 text-white cursor-pointer transition-all duration-200 ease-out hover:bg-[#2d8cd9] hover:shadow-md hover:scale-105"
          aria-label="확인"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default Modal;
