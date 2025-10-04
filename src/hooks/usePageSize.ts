import { useState, useEffect } from 'react';

/**
 * usePageSize 커스텀 훅
 *
 * 반응형 디자인에 따라 페이지네이션에서 한 페이지당 표시할 아이템 수를 관리하는 훅
 * 화면 크기가 변경될 때마다 적절한 페이지 사이즈를 자동으로 계산하여 반환
 *
 * 사용처: 메인 페이지의 AllActivities 컴포넌트 (체험 목록 페이지네이션)
 * - 데스크탑 (745px 이상): 8개 (4열 2행 그리드)
 * - 태블릿 (376-744px): 4개 (2열 2행 그리드)
 * - 모바일 (375px 이하): 6개 (2열 3행 그리드)
 */
export const usePageSize = () => {
  const [pageSize, setPageSize] = useState(() => {
    const width = window.innerWidth;
    if (width <= 375) return 6; // 모바일: 2열 3행
    if (width <= 744) return 4; // 태블릿: 2열 2행
    return 8; // 데스크탑: 4열 2행
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width <= 375) {
        setPageSize(6); // 모바일: 2열 3행
      } else if (width <= 744) {
        setPageSize(4); // 태블릿: 2열 2행
      } else {
        setPageSize(8); // 데스크탑: 4열 2행
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return pageSize;
};