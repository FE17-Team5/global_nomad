import type { Activity } from "../../../lib/activities/types";
import { ActivityCard } from "../PopularActivities";

interface ActivityGridProps {
  activities: Activity[];
  loading: boolean;
  pageSize?: number;
}

const ActivityGrid = ({ activities, loading, pageSize = 8 }: ActivityGridProps) => {
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

  if (activities.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="ty-16_M text-gray-500">
          조건에 맞는 체험이 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 sm-tablet:grid-cols-2 sm-mobile:grid-cols-2 gap-[1.5rem] sm-tablet:gap-4 sm-mobile:gap-4">
      {activities.map((activity) => (
        <ActivityCard
          key={activity.id}
          activity={activity}
        />
      ))}
    </div>
  );
};

export default ActivityGrid;