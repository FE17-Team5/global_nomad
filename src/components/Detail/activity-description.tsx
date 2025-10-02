/**
 * ActivityDescription 컴포넌트
 *
 * 체험에 대한 상세 설명 섹션
 * - "체험 설명" 제목 (18px, 볼드)
 * - 설명 본문 (16px, 1.8 행간, 제목과 8px 간격)
 * - 하단 테두리 (1px solid #E0E0E5, 본문과 40px 간격)
 */

interface ActivityDescriptionProps {
  description: string;
}

const ActivityDescription = ({ description }: ActivityDescriptionProps) => {
  return (
    <section
      className="pb-10 mobile:pb-5"
      style={{ borderBottom: "1px solid var(--color-gray-100)" }}
    >
      <h2
        className="ty-18_B mobile:ty-16_B"
        style={{ color: "var(--color-gray-950)" }}
      >
        체험 설명
      </h2>
      <p
        className="mt-2 mobile:mt-2 body-16_M"
        style={{ color: "var(--color-gray-950)" }}
      >
        {description}
      </p>
    </section>
  );
};

export default ActivityDescription;
