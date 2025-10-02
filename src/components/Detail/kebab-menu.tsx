/**
 * KebabMenu 컴포넌트
 *
 * 케밥 버튼 클릭 시 드롭다운 메뉴 표시
 * - 수정하기: 수정 페이지로 이동
 * - 삭제하기: 삭제 확인 후 메인 페이지로 이동
 * - 외부 클릭 시 자동 닫힘
 * - ESC 키로 닫기
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import iconMore from "../../assets/icon/icon_more.svg";
import { ConfirmModal } from "../Modal";
import { Dropdown } from "../Dropdown";
// TODO: API 연동 시 주석 해제
// import { deleteMyActivity } from "../../lib/my-activities/api";
// import { getAuthToken } from "../../utils/auth";

interface KebabMenuProps {
  activityId: number;
  onDelete?: () => void;
}

const KebabMenu = ({ activityId, onDelete }: KebabMenuProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/myprofile/edit?id=${activityId}`);
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleteModalOpen(false);

    // TODO: API 연동 (테스트 완료)
    /*
    try {
      const token = getAuthToken();
      
      await deleteMyActivity(activityId, token);

      if (onDelete) {
        onDelete();
      }

      console.log("삭제 성공:", activityId);
      alert("삭제되었습니다.");
      navigate("/");
    } catch (error) {
      console.error("삭제 실패:", error);
      alert("삭제에 실패했습니다.");
    }
    */

    // Mock 테스트
    if (onDelete) {
      onDelete();
    }
    alert("삭제되었습니다.");
    navigate("/");
  };

  // 드롭다운 메뉴 아이템
  const dropdownItems = [
    {
      label: "수정하기",
      onClick: handleEdit,
    },
    {
      label: "삭제하기",
      onClick: handleDelete,
    },
  ];

  return (
    <>
      {/* 케밥 버튼 + 드롭다운 */}
      <Dropdown
        trigger={
          <button
            type="button"
            className="p-2 rounded-full cursor-pointer transition-colors duration-200 hover:bg-gray-100"
            aria-label="더보기"
          >
            <img className="w-7 h-7" src={iconMore} alt="" />
          </button>
        }
        items={dropdownItems}
        align="right"
      />

      {/* 삭제 확인 모달 */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        message="체험을 삭제하시겠습니까?"
        confirmText="네"
      />
    </>
  );
};

export default KebabMenu;
