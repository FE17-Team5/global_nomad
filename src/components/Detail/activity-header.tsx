/**
 * ActivityHeader 컴포넌트
 * 
 * 체험 상세 페이지 최상단에 표시되는 헤더 영역
 * - 카테고리 (예: "투어", "스포츠")
 * - 제목 (32px, 볼드)
 * - 별점 + 리뷰 수
 * - 지도 아이콘 + 주소
 * - 우측 더보기(케밥) 버튼
 */

import iconMap from "../../assets/icon/icon_map.svg";
import iconMore from "../../assets/icon/icon_more.svg";

interface ActivityHeaderProps {
  category: string;
  title: string;
  rating: number;
  reviewCount: number;
  address: string;
}

const ActivityHeader = ({
  category,
  title,
  rating,
  reviewCount,
  address,
}: ActivityHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <p
          style={{
            fontSize: "var(--text-md)",
            lineHeight: "var(--text-md--line-height)",
            color: "var(--color-black-nomad)",
          }}
        >
          {category}
        </p>

        <h1
          className="mt-[10px] mb-[16px]"
          style={{
            fontSize: "var(--text-3xl)",
            lineHeight: "var(--text-3xl--line-height)",
            color: "var(--color-black-nomad)",
            fontWeight: "700",
          }}
        >
          {title}
        </h1>

        <p
          className="flex items-center gap-1"
          style={{
            fontSize: "var(--text-md)",
            lineHeight: "var(--text-md--line-height)",
            color: "var(--color-black-nomad)",
          }}
        >
          <span style={{ color: "var(--color-yellow-1)" }}>★</span>
          <span>
            {rating} ({reviewCount})
          </span>
          <img src={iconMap} alt="map" className="w-4 h-4 inline-block ml-2" />
          <span>{address}</span>
        </p>
      </div>

      <button className="ml-4" aria-label="더보기">
        <img className="w-10 h-10" src={iconMore} alt="" />
      </button>
    </div>
  );
};

export default ActivityHeader;
