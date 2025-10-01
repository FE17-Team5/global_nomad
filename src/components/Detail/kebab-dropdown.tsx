/**
 * KebabDropdown 컴포넌트
 *
 * 케밥 메뉴의 드롭다운 UI
 * - 수정하기 버튼
 * - 삭제하기 버튼
 * - 구분선
 * - 호버 효과
 */

interface KebabDropdownProps {
  onEdit: () => void;
  onDelete: () => void;
}

const KebabDropdown = ({ onEdit, onDelete }: KebabDropdownProps) => {
  return (
    <div
      className="absolute right-0 top-full w-[95px] bg-white rounded-lg z-50"
      style={{
        border: "1px solid #DDDDDD",
        backgroundColor: "#FFFFFF",
      }}
      role="menu"
    >
      <button
        type="button"
        onClick={onEdit}
        className="w-full h-[55px] hover:bg-gray-9 rounded-t-lg transition-colors flex items-center justify-center ty-16_M"
        style={{ color: "var(--color-gray-950)" }}
        role="menuitem"
      >
        수정하기
      </button>

      <button
        type="button"
        onClick={onDelete}
        className="w-full h-[55px] hover:bg-gray-9 rounded-b-lg transition-colors flex items-center justify-center ty-16_M"
        style={{ color: "var(--color-gray-950)" }}
        role="menuitem"
      >
        삭제하기
      </button>
    </div>
  );
};

export default KebabDropdown;
