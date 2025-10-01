/**
 * ActivityHeader 컴포넌트
 *
 * 체험 상세 페이지 최상단에 표시되는 헤더 영역
 * - 카테고리 (예: "투어", "스포츠")
 * - 제목 (32px, 볼드)
 * - 별점 + 리뷰 수
 * - 지도 아이콘 + 주소
 * - 우측 더보기(케밥) 버튼 (소유자만 표시)
 */

import iconMap from "../../assets/icon/icon_map.svg";
import KebabMenu from "./kebab-menu";

interface ActivityHeaderProps {
  id: number;
  category: string;
  title: string;
  rating: number;
  reviewCount: number;
  address: string;
  subtitle?: string;
  isOwner?: boolean;
}

const ActivityHeader = ({
  id,
  category,
  title,
  rating,
  reviewCount,
  address,
  subtitle,
  isOwner = false,
}: ActivityHeaderProps) => {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col">
        <p className="ty-14_M" style={{ color: "var(--color-gray-950)" }}>
          {category}
        </p>

        <h1
          className="mt-2 mb-[17px] ty-24_B"
          style={{ color: "var(--color-gray-950)" }}
        >
          {title}
        </h1>

        <p
          className="flex items-center gap-1 ty-14_M mb-[10px]"
          style={{ color: "var(--color-gray-700)" }}
        >
          <span style={{ color: "var(--color-yellow-star)" }}>★</span>
          <span>
            {rating} ({reviewCount})
          </span>
        </p>

        <p
          className="flex items-center gap-1 ty-14_M mb-[17px]"
          style={{ color: "var(--color-gray-700)" }}
        >
          <img src={iconMap} alt="map" className="w-4 h-4" />
          <span>{address}</span>
        </p>

        {subtitle && (
          <p
            className="body-16_M mb-[68px]"
            style={{ color: "var(--color-gray-1)" }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* 소유자일 때만 케밥 메뉴 표시 */}
      {isOwner && (
        <div className="self-start">
          <KebabMenu activityId={id} />
        </div>
      )}
    </div>
  );
};

export default ActivityHeader;
