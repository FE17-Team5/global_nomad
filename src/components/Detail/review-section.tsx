/**
 * ReviewSection 컴포넌트
 * 
 * 체험 후기 전체 영역 (페이지네이션 포함)
 * - "후기" 제목
 * - 평균 평점 (50px 큰 숫자) + "매우 만족" + 총 후기 수
 * - 리뷰 아이템 리스트 (한 페이지당 3개)
 * - 페이지네이션 (5개 단위 블록)
 * - 상태 관리: 현재 페이지, 리뷰 필터링
 * - 성능 최적화: useMemo로 리뷰 계산 캐싱
 */

import { useState, useMemo } from "react";
import ReviewItem from "./review-item";
import Pagination from "../Pagination/pagination";

const REVIEWS_PER_PAGE = 3;

interface ReviewUser {
  profileImageUrl: string;
  nickname: string;
  id?: number;
}

interface Review {
  id: number;
  user: ReviewUser;
  content: string;
  createdAt: string;
}

interface ReviewSectionProps {
  averageRating: number;
  totalCount: number;
  reviews: Review[];
}

const ReviewSection = ({ averageRating, totalCount, reviews }: ReviewSectionProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE);

  // 현재 페이지에 표시할 리뷰 계산
  const currentReviews = useMemo(() => {
    const startIndex = (currentPage - 1) * REVIEWS_PER_PAGE;
    const endIndex = startIndex + REVIEWS_PER_PAGE;
    return reviews.slice(startIndex, endIndex);
  }, [currentPage, reviews]);

  return (
    <section className="mt-[40px] mb-[413px] max-w-[790px]">
      {/* 후기 제목 */}
      <h2
        style={{
          fontSize: "var(--text-2lg)",
          lineHeight: "var(--text-2lg--line-height)",
          color: "var(--color-black-nomad)",
          fontWeight: "700",
        }}
      >
        후기
      </h2>

      {/* 평점 정보 */}
      <div className="mt-[24px] flex justify-between items-center max-w-[187px]">
        {/* 평균 평점 */}
        <div
          style={{
            fontSize: "50px",
            fontWeight: "600",
            color: "var(--color-black-nomad)",
          }}
        >
          {averageRating}
        </div>

        {/* 만족도 및 후기 수 */}
        <div className="flex flex-col items-end">
          <p
            style={{
              fontSize: "var(--text-2lg)",
              lineHeight: "var(--text-2lg--line-height)",
              color: "var(--color-black-nomad)",
            }}
          >
            매우 만족
          </p>
          <p
            style={{
              fontSize: "var(--text-md)",
              lineHeight: "var(--text-md--line-height)",
              color: "var(--color-black)",
            }}
          >
            <span style={{ color: "var(--color-yellow-1)" }}>★</span> {totalCount}개 후기
          </p>
        </div>
      </div>

      {/* 리뷰 리스트 */}
      <div className="mt-[24px]">
        {currentReviews.map((review, index) => (
          <ReviewItem
            key={review.id}
            user={review.user}
            content={review.content}
            createdAt={review.createdAt}
            showDivider={index < currentReviews.length - 1}
          />
        ))}
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </section>
  );
};

export default ReviewSection;
