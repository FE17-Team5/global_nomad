/**
 * ReservationSidebar 컴포넌트
 * 
 * 우측에 고정 표시되는 예약 사이드바
 * - 크기: 384px × 746px
 * - 흰색 배경, 회색 테두리, 그림자 효과
 * - 추후 예약 기능 구현 예정:
 *   · 가격 표시
 *   · 날짜 선택 (캘린더)
 *   · 시간 선택 (드롭다운)
 *   · 인원 선택
 *   · 총 합계 금액
 *   · 예약하기 버튼
 */

const ReservationSidebar = () => {
  return (
    <aside
      className="w-[384px] h-[746px] bg-white border border-gray-7 rounded-lg flex items-center justify-center"
      style={{ boxShadow: "0px 4px 16px 0px #1122110D" }}
      aria-label="예약 정보"
    >
      <span
        style={{
          fontSize: "var(--text-lg)",
          lineHeight: "var(--text-lg--line-height)",
          fontWeight: "600",
        }}
      >
        우측 컨테이너 (384px × 746px)
      </span>
    </aside>
  );
};

export default ReservationSidebar;
