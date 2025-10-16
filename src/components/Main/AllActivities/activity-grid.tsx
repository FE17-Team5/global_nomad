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
            className="bg-gray-200 rounded-[2rem] animate-pulse h-[22.875rem]"
          />
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

  return (
    <div className="grid grid-cols-4 sm-tablet:grid-cols-2 sm-mobile:grid-cols-2 gap-[1.5rem] sm-tablet:gap-4 sm-mobile:gap-4">
      {activities.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  );
};

export default ActivityGrid;
