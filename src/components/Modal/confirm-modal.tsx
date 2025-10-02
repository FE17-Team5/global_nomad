/**
 * ConfirmModal 컴포넌트
 *
 * 범용 확인 모달 컴포넌트
 * - 경고/확인용 모달
 * - 이미지 + 텍스트 + 2개 버튼 (아니오 / 사용자 정의)
 * - 반응형 (데스크탑/태블릿, 모바일)
 */

import { useEffect } from "react";
import warningIcon from "../../assets/atc/warning.svg";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
  confirmText: string;
}

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  message,
  confirmText,
}: ConfirmModalProps) => {
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
      className="fixed inset-0 z-50 flex items-center justify-center px-6 bg-black/50"
      onClick={onClose} // 외부 클릭 시 닫기
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-message"
    >
      {/* 모달 창 */}
      <div
        className="confirm-modal-container bg-white rounded-3xl flex flex-col items-center w-full max-w-[400px] h-[242px] sm-mobile:max-w-[320px] sm-mobile:h-[185px] pt-[30px] pb-[30px]"
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 이벤트 전파 방지
      >
        {/* 이미지 (88x88 → 모바일: 49x49) */}
        <div className="w-[88px] h-[88px] sm-mobile:w-[49px] sm-mobile:h-[49px] flex items-center justify-center">
          <img
            src={warningIcon}
            alt=""
            role="presentation"
            className="w-full h-full object-contain"
          />
        </div>

        {/* 텍스트 박스 (간격: 2px) */}
        <div
          id="confirm-modal-message"
          className="mt-[2px] text-center ty-18_B sm-mobile:ty-16_B text-gray-950"
        >
          {message}
        </div>

        {/* 버튼 컨테이너 (간격: 24px → 모바일: 20px) */}
        <div className="mt-6 sm-mobile:mt-5 w-full px-[30px] sm-mobile:px-6 flex justify-center gap-3 sm-mobile:gap-2">
          {/* 아니오 버튼 */}
          <button
            type="button"
            onClick={onClose}
            className="w-full max-w-[135px] sm-mobile:max-w-[113px] h-[47px] sm-mobile:h-[41px] rounded-lg ty-16_M border border-gray-200 bg-white text-gray-600 cursor-pointer transition-all duration-200 ease-out hover:bg-gray-100 hover:shadow-md hover:scale-105"
            aria-label="취소"
          >
            아니오
          </button>

          {/* 확인 버튼 (사용자 정의 텍스트) */}
          <button
            type="button"
            onClick={onConfirm}
            className="w-full max-w-[135px] sm-mobile:max-w-[113px] h-[47px] sm-mobile:h-[41px] rounded-lg ty-16_B bg-primary-500 text-white cursor-pointer transition-all duration-200 ease-out hover:bg-[#2d8cd9] hover:shadow-md hover:scale-105"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

