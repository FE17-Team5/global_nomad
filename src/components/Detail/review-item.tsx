/**
 * ReviewItem 컴포넌트
 * 
 * 개별 리뷰 하나를 표시하는 아이템
 * - 프로필 이미지 (45px × 45px, 둥근 모양)
 * - 닉네임 (볼드) | 작성일 (회색)
 * - 리뷰 내용 (16px)
 * - 구분선 (showDivider prop으로 제어)
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
  showDivider?: boolean;
}

const formatDate = (dateString: string): string => {
  return new Date(dateString)
    .toLocaleDateString("ko-KR")
    .replace(/\./g, ".")
    .replace(/\s/g, " ");
};

const ReviewItem = ({ user, content, createdAt, showDivider = true }: ReviewItemProps) => {
  return (
    <>
      <article className="flex gap-4">
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
            <span
              style={{
                fontSize: "var(--text-lg)",
                lineHeight: "var(--text-lg--line-height)",
                color: "var(--color-black-nomad)",
                fontWeight: "700",
              }}
            >
              {user.nickname}
            </span>
            <span style={{ color: "var(--color-gray-4)" }}>|</span>
            <span
              style={{
                fontSize: "var(--text-lg)",
                lineHeight: "var(--text-lg--line-height)",
                color: "var(--color-gray-4)",
              }}
            >
              {formatDate(createdAt)}
            </span>
          </div>

          {/* 리뷰 내용 */}
          <p
            className="mt-2"
            style={{
              fontSize: "var(--text-lg)",
              lineHeight: "var(--text-lg--line-height)",
              color: "var(--color-black-nomad)",
            }}
          >
            {content}
          </p>
        </div>
      </article>

      {/* 수평선 */}
      {showDivider && (
        <div
          className="my-[24px] h-[1px]"
          style={{ backgroundColor: "var(--color-black-nomad)" }}
        />
      )}
    </>
  );
};

export default ReviewItem;
