/**
 * ActivityLocation 컴포넌트
 * 
 * 체험 장소의 위치 정보 섹션
 * - 카카오 지도 (790px × 450px)
 * - 주소 기반 Geocoding으로 좌표 변환
 * - 마커 표시
 * - 지도 아이콘 + 주소 텍스트
 * - 하단 수평선
 */

import { useEffect, useRef } from "react";
import iconMap from "../../assets/icon/icon_map.svg";

interface ActivityLocationProps {
  address: string;
}

// 카카오 맵 타입 선언
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

const ActivityLocation = ({ address }: ActivityLocationProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainer.current || !window.kakao) return;

    const kakao = window.kakao;

    // 지도 옵션
    const mapOption = {
      center: new kakao.maps.LatLng(37.5665, 126.9780), // 서울 시청 (기본 중심)
      level: 3, // 확대 레벨
    };

    // 지도 생성
    const map = new kakao.maps.Map(mapContainer.current, mapOption);

    // 주소-좌표 변환 객체 생성
    const geocoder = new kakao.maps.services.Geocoder();

    // 주소로 좌표 검색
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    geocoder.addressSearch(address, (result: any, status: any) => {
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        // 지도 중심을 결과값으로 이동
        map.setCenter(coords);

        // 마커 생성
        const marker = new kakao.maps.Marker({
          map: map,
          position: coords,
        });

        marker.setMap(map);
      } else {
        console.error("주소 검색 실패:", status);
      }
    });
  }, [address]);

  return (
    <section className="mt-[40px]">
      {/* 카카오 지도 */}
      <div
        ref={mapContainer}
        className="w-full h-[450px] rounded-lg"
        style={{ border: "1px solid var(--color-gray-7)" }}
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
