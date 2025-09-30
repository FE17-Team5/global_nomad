/**
 * ActivityDescription 컴포넌트
 * 
 * 체험에 대한 상세 설명 섹션
 * - 상단 수평선 (구분선)
 * - "체험 설명" 제목 (20px, 볼드)
 * - 설명 본문 (16px, 줄바꿈 포함)
 * - 하단 수평선
 */

interface ActivityDescriptionProps {
  description: string;
}

const ActivityDescription = ({ description }: ActivityDescriptionProps) => {
  return (
    <section>
      {/* 수평선 */}
      <div className="h-[1px]" style={{ backgroundColor: "var(--color-black-nomad)" }} />

      {/* 설명 내용 */}
      <div className="mt-[40px]">
        <h2
          style={{
            fontSize: "var(--text-xl)",
            lineHeight: "var(--text-xl--line-height)",
            color: "var(--color-black-nomad)",
            fontWeight: "700",
          }}
        >
          체험 설명
        </h2>
        <p
          className="mt-[16px]"
          style={{
            fontSize: "var(--text-lg)",
            lineHeight: "var(--text-lg--line-height)",
            color: "var(--color-black-nomad)",
          }}
        >
          {description}
        </p>
      </div>

      {/* 하단 수평선 */}
      <div
        className="mt-[34px] h-[1px]"
        style={{ backgroundColor: "var(--color-black-nomad)" }}
      />
    </section>
  );
};

export default ActivityDescription;
