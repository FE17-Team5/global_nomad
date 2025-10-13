import type { Activity } from "../../../lib/activities/types";
import starIcon from "../../../assets/icon/icon_star_on.svg";

interface ActivityCardProps {
  activity: Activity;
  className?: string;
}

const ActivityCard = ({ activity, className = "" }: ActivityCardProps) => {
  return (
    <div className={`relative w-full h-[22.875rem] rounded-[2rem] overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}>
      {/* Background Image */}
      <img
        src={activity.bannerImageUrl}
        alt=""
        role="presentation"
        className="w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Rating Badge */}
      <div className="absolute top-[1.125rem] right-[1.125rem] bg-black/60 text-white rounded-full px-2 py-1 flex items-center gap-1">
        <img
          src={starIcon}
          alt=""
          role="presentation"
          className="w-3 h-3"
        />
        <span className="ty-12_M">{activity.rating}</span>
      </div>

      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 right-0 text-white py-5 px-[1.875rem]">
        {/* Title */}
        <h3 className="ty-16_B text-white mb-[1.125rem] line-clamp-2">
          {activity.title}
        </h3>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="ty-20_B sm-tablet:ty-18_B sm-mobile:ty-16_B text-white">
              ₩{activity.price.toLocaleString()}
            </span>
            <span className="ty-12_M text-white/80">/ 인</span>
          </div>

          {/* Review Count */}
          <span className="ty-12_M text-white/70">
            후기 {activity.reviewCount}개
          </span>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;