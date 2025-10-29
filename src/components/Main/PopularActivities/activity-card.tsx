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
      className={`group relative w-full h-[22.875rem] rounded-[2rem] overflow-hidden shadow-card hover:shadow-xl transition-all duration-300 block ${className}`}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
        style={{ backgroundImage: `url(${activity.bannerImageUrl})` }}
        role="img"
        aria-label={activity.title}
      />

      {/* Gradient Overlay - Softer and more balanced */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/15 to-black/5 group-hover:from-black/50 transition-all duration-300" />

      {/* Rating Badge - Softer with semi-transparent background */}
      <div className="absolute top-[1.125rem] right-[1.125rem] bg-white/85 backdrop-blur-sm text-gray-900 rounded-full px-2 py-1 flex items-center gap-1 shadow-sm transform group-hover:scale-105 transition-transform duration-200">
        <img src={starIcon} alt="" className="w-3 h-3" aria-hidden="true" />
        <span className="ty-12_M font-semibold">{activity.rating}</span>
      </div>

      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 right-0 text-white py-5 px-[1.875rem] sm-mobile:px-4 transform group-hover:translate-y-[-0.25rem] transition-transform duration-300" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)' }}>
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
