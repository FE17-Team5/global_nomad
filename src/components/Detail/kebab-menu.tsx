/**
 * KebabMenu 컴포넌트
 *
 * 케밥 버튼 클릭 시 드롭다운 메뉴 표시
 * - 수정하기: 수정 페이지로 이동
 * - 삭제하기: 삭제 확인 후 메인 페이지로 이동
 * - 외부 클릭 시 자동 닫힘
 * - ESC 키로 닫기
 */

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import iconMore from "../../assets/icon/icon_more.svg";
import KebabDropdown from "./kebab-dropdown";

interface KebabMenuProps {
  activityId: number;
  onDelete?: () => void;
}

const KebabMenu = ({ activityId, onDelete }: KebabMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // ESC 키로 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleEdit = () => {
    setIsOpen(false);
    navigate(`/myprofile/edit?id=${activityId}`);
  };

  const handleDelete = async () => {
    setIsOpen(false);

    if (!window.confirm("정말 삭제하시겠습니까?")) {
      return;
    }

    try {
      // 삭제 API 호출 (추후 구현)
      // const authToken = localStorage.getItem('accessToken');
      // await deleteMyActivity(activityId, authToken);

      if (onDelete) {
        onDelete();
      }

      alert("삭제되었습니다.");

      // 메인 페이지로 이동
      navigate("/");
    } catch (error) {
      console.error("삭제 실패:", error);
      alert("삭제에 실패했습니다.");
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* 케밥 버튼 */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer"
        aria-label="더보기"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <img className="w-7 h-7" src={iconMore} alt="" />
      </button>

      {/* 드롭다운 메뉴 */}
      {isOpen && <KebabDropdown onEdit={handleEdit} onDelete={handleDelete} />}
    </div>
  );
};

export default KebabMenu;
