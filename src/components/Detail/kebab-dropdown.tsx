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
      className="absolute right-0 top-full w-[160px] bg-white rounded-lg z-50"
      style={{
        border: "1px solid #DDDDDD",
        backgroundColor: "#FFFFFF",
      }}
      role="menu"
    >
      <button
        onClick={onEdit}
        className="w-full h-[58px] hover:bg-gray-9 rounded-t-lg transition-colors flex items-center justify-center"
        style={{
          fontSize: "var(--text-2lg)",
          lineHeight: "var(--text-sm--line-height)",
          color: "var(--color-gray-1)",
        }}
        role="menuitem"
      >
        수정하기
      </button>

      <div className="h-[1px]" style={{ backgroundColor: "#DDDDDD" }} />

      <button
        onClick={onDelete}
        className="w-full h-[58px] hover:bg-gray-9 rounded-b-lg transition-colors flex items-center justify-center"
        style={{
          fontSize: "var(--text-2lg)",
          lineHeight: "var(--text-sm--line-height)",
          color: "var(--color-gray-1)",
        }}
        role="menuitem"
      >
        삭제하기
      </button>
    </div>
  );
};

export default KebabDropdown;
