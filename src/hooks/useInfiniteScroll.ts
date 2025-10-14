/**
 * useInfiniteScroll
 *
 * IntersectionObserver를 사용한 무한스크롤 커스텀 훅
 * - 타겟 요소가 뷰포트에 보이면 콜백 실행
 * - 재사용 가능한 범용 훅
 */

import { useEffect, useRef } from "react";

export const useInfiniteScroll = (
  callback: () => void,
  hasNextPage: boolean | undefined,
  isFetching: boolean,
) => {
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // 타겟이 보이고, 다음 페이지가 있고, 현재 fetching 중이 아닐 때
        if (entries[0].isIntersecting && hasNextPage && !isFetching) {
          callback();
        }
      },
      { threshold: 1.0 }, // 100% 보일 때 트리거
    );

    const target = observerTarget.current;
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [callback, hasNextPage, isFetching]);

  return observerTarget;
};
