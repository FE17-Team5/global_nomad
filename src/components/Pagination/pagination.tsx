/**
 * Pagination 컴포넌트
 *
 * 재사용 가능한 페이지네이션 (5개 블록 단위)
 * - 좌측 화살표: 이전 5페이지 블록으로 이동
 * - 페이지 번호: 최대 5개씩 표시 (1~5, 6~10, ...)
 * - 우측 화살표: 다음 5페이지 블록으로 이동
 * - 동적 블록 계산: 현재 페이지에 따라 자동 조정
 * - 활성 페이지: 녹색 배경 + 흰색 텍스트
 * - 비활성 버튼: 회색 처리
 * - 접근성: aria-label, aria-current 적용
 * - 성능: useMemo로 페이지 번호 계산 캐싱
 */

import { useMemo } from "react";
import iconChevron from "../../assets/icon/icon_chevron_down.svg";

const PAGE_BLOCK_SIZE = 5;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  // 현재 페이지 블록 계산 (1~5, 6~10, 11~15...)
  const { startPage, endPage, pageNumbers } = useMemo(() => {
    const currentBlock = Math.floor((currentPage - 1) / PAGE_BLOCK_SIZE);
    const start = currentBlock * PAGE_BLOCK_SIZE + 1;
    const end = Math.min(start + PAGE_BLOCK_SIZE - 1, totalPages);
    const numbers = Array.from(
      { length: end - start + 1 },
      (_, i) => start + i,
    );

    return { startPage: start, endPage: end, pageNumbers: numbers };
  }, [currentPage, totalPages]);

  const handlePrevBlock = () => {
    onPageChange(startPage - PAGE_BLOCK_SIZE);
  };

  const handleNextBlock = () => {
    onPageChange(startPage + PAGE_BLOCK_SIZE);
  };

  const isFirstBlock = startPage === 1;
  const isLastBlock = endPage === totalPages;

  return (
    <nav
      className="flex items-center justify-center gap-1"
      role="navigation"
      aria-label="페이지네이션"
    >
      {/* 좌측 화살표 */}
      <button
        onClick={handlePrevBlock}
        disabled={isFirstBlock}
        className="w-10 h-10 flex items-center justify-center rounded-md transition-all duration-200 ease-out hover:bg-gray-100 hover:shadow-md hover:scale-105 disabled:hover:bg-transparent disabled:hover:shadow-none disabled:hover:scale-100"
        style={{
          cursor: isFirstBlock ? "not-allowed" : "pointer",
        }}
        aria-label="이전 페이지 블록"
      >
        <img
          src={iconChevron}
          alt=""
          className="w-5 h-5 rotate-90"
          style={{
            filter: isFirstBlock
              ? "brightness(0) saturate(100%) invert(68%) sepia(0%) saturate(0%) hue-rotate(169deg) brightness(92%) contrast(88%)"
              : "none",
          }}
        />
      </button>

      {/* 페이지 번호 박스 (동적) */}
      {pageNumbers.map((num) => {
        const isActive = num === currentPage;

        return (
          <button
            key={num}
            onClick={() => onPageChange(num)}
            className="w-10 h-10 flex items-center justify-center ty-14_B rounded-md transition-all duration-200 ease-out hover:bg-gray-100 hover:shadow-md hover:scale-105"
            style={{
              color: isActive
                ? "var(--color-gray-950)"
                : "var(--color-gray-300)",
              borderBottom: isActive
                ? "2px solid var(--color-primary-500)"
                : "none",
              cursor: "pointer",
            }}
            aria-label={`${num}페이지로 이동`}
            aria-current={isActive ? "page" : undefined}
          >
            {num}
          </button>
        );
      })}

      {/* 우측 화살표 */}
      <button
        onClick={handleNextBlock}
        disabled={isLastBlock}
        className="w-10 h-10 flex items-center justify-center rounded-md transition-all duration-200 ease-out hover:bg-gray-100 hover:shadow-md hover:scale-105 disabled:hover:bg-transparent disabled:hover:shadow-none disabled:hover:scale-100"
        style={{
          cursor: isLastBlock ? "not-allowed" : "pointer",
        }}
        aria-label="다음 페이지 블록"
      >
        <img
          src={iconChevron}
          alt=""
          className="w-5 h-5 -rotate-90"
          style={{
            filter: isLastBlock
              ? "brightness(0) saturate(100%) invert(68%) sepia(0%) saturate(0%) hue-rotate(169deg) brightness(92%) contrast(88%)"
              : "none",
          }}
        />
      </button>
    </nav>
  );
};

export default Pagination;
