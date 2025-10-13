import { useRef, useState } from 'react';

/**
 * useDragScroll 커스텀 훅
 *
 * 마우스 드래그로 수평 스크롤 기능을 제공하는 훅
 * 드래그 상태 관리와 스크롤 이벤트 핸들러들을 반환
 *
 * 사용처: 메인 페이지의 AllActivities 컴포넌트 (카테고리 필터 드래그 스크롤)
 */
export const useDragScroll = () => {
  const scrollRef = useRef<HTMLDivElement>(null); // 스크롤 컨테이너 DOM 참조
  const [isDragging, setIsDragging] = useState(false); // 현재 드래그 중인지 상태
  const [startX, setStartX] = useState(0); // 드래그 시작 X 좌표
  const [scrollLeft, setScrollLeft] = useState(0); // 드래그 시작 시점의 스크롤 위치

  // 드래그 시작 - 시작 위치와 스크롤 위치 저장
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;

    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  // 마우스가 컨테이너를 벗어날 때 드래그 중단
  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // 마우스 버튼을 뗄 때 드래그 종료
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 드래그 중 마우스 이동 시 스크롤 위치 업데이트
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;

    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // 스크롤 속도 조절 (2배속)
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return {
    scrollRef,
    isDragging,
    handleMouseDown,
    handleMouseLeave,
    handleMouseUp,
    handleMouseMove,
  };
};