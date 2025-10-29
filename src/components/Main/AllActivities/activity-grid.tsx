/**
 * 체험 그리드 컴포넌트
 *
 * 체험 목록을 그리드 형태로 표시하는 컴포넌트
 * - 반응형 그리드: 데스크탑(4열), 태블릿(2열), 모바일(2열)
 * - 로딩 상태: 스켈레톤 UI 표시
 * - 빈 상태: 안내 메시지 표시
 */

import type { Activity } from "../../../lib/activities/types";
import { ActivityCard } from "../PopularActivities";

interface ActivityGridProps {
  activities: Activity[];
  loading: boolean;
  pageSize?: number;
}

const ActivityGrid = ({
  activities,
  loading,
  pageSize = 8,
}: ActivityGridProps) => {
  // 로딩 상태: 스켈레톤 UI 표시
  if (loading) {
    return (
      <div className="grid grid-cols-4 sm-tablet:grid-cols-2 sm-mobile:grid-cols-2 gap-[1.5rem] sm-tablet:gap-4 sm-mobile:gap-4">
        {Array.from({ length: pageSize }).map((_, index) => (
          <div
            key={index}
            className="relative w-full h-[22.875rem] rounded-[2rem] overflow-hidden shadow-card bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100"
          >
            {/* Shimmer Animation */}
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />

            {/* Rating Badge Skeleton */}
            <div className="absolute top-[1.125rem] right-[1.125rem] w-12 h-6 bg-white/90 rounded-full animate-pulse" />

            {/* Content Skeleton */}
            <div className="absolute bottom-0 left-0 right-0 py-5 px-[1.875rem] sm-mobile:px-4 space-y-3">
              {/* Title Skeleton */}
              <div className="space-y-2">
                <div className="h-4 bg-white/80 rounded-lg w-3/4 animate-pulse" />
                <div className="h-4 bg-white/80 rounded-lg w-1/2 animate-pulse" />
              </div>

              {/* Price Skeleton */}
              <div className="flex items-center gap-2">
                <div className="h-6 bg-white/80 rounded-lg w-24 animate-pulse" />
                <div className="h-4 bg-white/70 rounded-lg w-16 animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // 빈 상태: 체험이 없는 경우
  if (activities.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="ty-16_M text-gray-500">조건에 맞는 체험이 없습니다.</p>
      </div>
    );
  }

  // min-height 제거: 그리드가 실제 카드 개수에 맞춰 자동으로 높이 조정
  // 데스크탑: 4열, 태블릿/모바일: 2열
  return (
    <div className="grid grid-cols-4 sm-tablet:grid-cols-2 sm-mobile:grid-cols-2 gap-[1.5rem] sm-tablet:gap-4 sm-mobile:gap-4">
      {activities.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  );
};

export default ActivityGrid;
