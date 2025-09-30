/**
 * ActivityLocation 컴포넌트
 * 
 * 체험 장소의 위치 정보 섹션
 * - 지도 이미지 (790px × 450px) - 추후 카카오맵 API로 대체 예정
 * - 지도 아이콘 + 주소 텍스트
 * - 하단 수평선
 * - lazy loading 적용
 */

import iconMap from "../../assets/icon/icon_map.svg";

interface ActivityLocationProps {
  address: string;
}

const ActivityLocation = ({ address }: ActivityLocationProps) => {
  return (
    <section className="mt-[40px]">
      {/* 지도 이미지 */}
      <img
        src="https://i.namu.wiki/i/HyQybDS2S7uXwtybgBHA_z7S5XGClDqdmSQnpoQSOWBHX916794QHxKOwVbjO3xRk5BqFMQlWNK4X16n430AyA.webp"
        alt="지도"
        className="w-full h-[450px] object-cover rounded-lg"
        loading="lazy"
      />

      {/* 주소 */}
      <div className="mt-4 flex items-center gap-1">
        <img src={iconMap} alt="" className="w-4 h-4" />
        <span
          style={{
            fontSize: "var(--text-lg)",
            lineHeight: "var(--text-lg--line-height)",
            color: "var(--color-black-nomad)",
          }}
        >
          {address}
        </span>
      </div>

      {/* 하단 수평선 */}
      <div
        className="mt-[40px] h-[1px]"
        style={{ backgroundColor: "var(--color-black-nomad)" }}
      />
    </section>
  );
};

export default ActivityLocation;
