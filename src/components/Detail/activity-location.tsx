/**
 * ActivityLocation 컴포넌트
 *
 * 체험 장소의 위치 정보 섹션
 * - "오시는 길" 제목 (18px, 볼드)
 * - 지도 아이콘 + 주소 텍스트 (제목과 8px 간격)
 * - 카카오 지도 (670px × 450px, 주소와 8px 간격)
 * - 주소 기반 Geocoding으로 좌표 변환
 * - 마커 표시
 * - 하단 테두리 (1px solid #E0E0E5, 지도와 40px 간격)
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
    // 카카오 맵 SDK 로딩 대기
    const initMap = () => {
      if (!mapContainer.current || !window.kakao) {
        console.log("카카오 맵 SDK 로딩 중...");
        return;
      }

      const kakao = window.kakao;

      // 지도 옵션
      const mapOption = {
        center: new kakao.maps.LatLng(37.5665, 126.978), // 서울 시청 (기본 중심)
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
    };

    // 카카오 맵 SDK가 이미 로드되었는지 확인
    if (window.kakao && window.kakao.maps) {
      initMap();
    } else {
      // SDK 로드 대기
      const checkKakao = setInterval(() => {
        if (window.kakao && window.kakao.maps) {
          clearInterval(checkKakao);
          initMap();
        }
      }, 100);

      return () => clearInterval(checkKakao);
    }
  }, [address]);

  return (
    <section
      className="mt-[40px] pb-10"
      style={{ borderBottom: "1px solid var(--color-gray-100)" }}
    >
      {/* 제목 */}
      <h2 className="ty-18_B" style={{ color: "var(--color-gray-950)" }}>
        오시는 길
      </h2>

      {/* 주소 */}
      <div className="mt-2 flex items-center gap-1">
        <img src={iconMap} alt="" className="w-4 h-4" />
        <span className="ty-14_SB">{address}</span>
      </div>

      {/* 카카오 지도 */}
      <div
        ref={mapContainer}
        className="mt-2 w-full h-[450px] rounded-3xl"
        style={{ border: "1px solid var(--color-gray-8)" }}
      />
    </section>
  );
};

export default ActivityLocation;
