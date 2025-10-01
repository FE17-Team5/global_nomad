/**
 * ReviewItem 컴포넌트
 *
 * 개별 리뷰 하나를 표시하는 아이템 카드
 * - 프로필 이미지 (45px × 45px, 둥근 모양)
 * - 닉네임 (볼드) | 작성일 (회색)
 * - 리뷰 내용 (16px)
 * - 그림자 효과
 * - 날짜는 "2023. 12. 4" 형식으로 자동 포맷팅
 */

interface ReviewUser {
  profileImageUrl: string;
  nickname: string;
}

interface ReviewItemProps {
  user: ReviewUser;
  content: string;
  createdAt: string;
}

const formatDate = (dateString: string): string => {
  return new Date(dateString)
    .toLocaleDateString("ko-KR")
    .replace(/\./g, ".")
    .replace(/\s/g, " ");
};

const ReviewItem = ({ user, content, createdAt }: ReviewItemProps) => {
  return (
    <article
      className="flex gap-4 p-6 bg-white rounded-3xl"
      style={{ boxShadow: "0px 4px 24px 0px var(--shadow-blue-light)" }}
    >
      {/* 좌측: 프로필 이미지 */}
      <img
        src={user.profileImageUrl}
        alt=""
        className="w-[45px] h-[45px] rounded-full object-cover"
        loading="lazy"
      />

      {/* 우측: 리뷰 내용 */}
      <div className="flex-1">
        {/* 닉네임과 작성일 */}
        <div className="flex items-center gap-2">
          <span className="ty-16_B" style={{ color: "var(--color-gray-950)" }}>
            {user.nickname}
          </span>
          <span style={{ color: "var(--color-gray-4)" }}>|</span>
          <span className="ty-14_M" style={{ color: "var(--color-gray-4)" }}>
            {formatDate(createdAt)}
          </span>
        </div>

        {/* 리뷰 내용 */}
        <p
          className="mt-2 body-16_M"
          style={{ color: "var(--color-gray-950)" }}
        >
          {content}
        </p>
      </div>
    </article>
  );
};

export default ReviewItem;
