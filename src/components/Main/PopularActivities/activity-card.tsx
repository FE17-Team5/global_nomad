import { Link } from "react-router-dom";
import starIcon from "../../../assets/icon/icon_star_on.svg";
import type { Activity } from "../../../lib/activities/types";

interface ActivityCardProps {
  activity: Activity;
  className?: string;
}

const ActivityCard = ({ activity, className = "" }: ActivityCardProps) => {
  return (
    <Link
      to={`/detail/${activity.id}`}
      className={`relative w-full h-[22.875rem] rounded-[2rem] overflow-hidden shadow-card hover:shadow-md transition-shadow duration-200 block ${className}`}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${activity.bannerImageUrl})` }}
        role="img"
        aria-label={activity.title}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Rating Badge */}
      <div className="absolute top-[1.125rem] right-[1.125rem] bg-black/60 text-white rounded-full px-2 py-1 flex items-center gap-1">
        <img src={starIcon} alt="" className="w-3 h-3" aria-hidden="true" />
        <span className="ty-12_M">{activity.rating}</span>
      </div>

      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 right-0 text-white py-5 px-[1.875rem] sm-mobile:px-4">
        {/* Title */}
        <h3 className="ty-16_B text-white mb-[1.125rem] narrow-desktop:mb-2 narrow-card:mb-2 line-clamp-2">
          {activity.title}
        </h3>

        {/* Review Count - Show between title and price in narrow layouts */}
        <div className="hidden narrow-desktop:block narrow-card:block mb-2">
          <span className="ty-12_M narrow-card:ty-11_M text-white/70">
            후기 {activity.reviewCount}개
          </span>
        </div>

        {/* Price and Review - Horizontal layout by default */}
        <div className="flex items-center justify-between gap-2 narrow-desktop:justify-start narrow-card:justify-start">
          <div className="flex items-baseline gap-1 min-w-0">
            <span className="ty-20_B narrow-desktop:ty-16_B narrow-card:ty-12_B text-white truncate">
              ₩{activity.price.toLocaleString()}
            </span>
            <span className="ty-12_M narrow-card:ty-11_M text-white/80 whitespace-nowrap">
              / 인
            </span>
          </div>

          {/* Review Count - Hide in narrow layouts */}
          <span className="ty-12_M text-white/70 whitespace-nowrap narrow-desktop:hidden narrow-card:hidden">
            후기 {activity.reviewCount}개
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ActivityCard;
