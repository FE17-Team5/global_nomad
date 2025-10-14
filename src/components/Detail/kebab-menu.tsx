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
import { useDeleteMyActivity } from "../../hooks/mutations/useDeleteMyActivity";
import { Dropdown } from "../Dropdown";
import { ConfirmModal, Modal } from "../Modal";

interface KebabMenuProps {
  activityId: number;
}

const KebabMenu = ({ activityId }: KebabMenuProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const navigate = useNavigate();

  const authToken = localStorage.getItem("accessToken");
  const deleteActivityMutation = useDeleteMyActivity(authToken || "");

  const handleEdit = () => {
    navigate(`/myprofile/edit?id=${activityId}`);
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleteModalOpen(false);

    try {
      await deleteActivityMutation.mutateAsync(activityId);
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error("삭제 실패:", error);
      setIsErrorModalOpen(true);
    }
  };

  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false);
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

      {/* 삭제 성공 모달 */}
      <Modal
        isOpen={isSuccessModalOpen}
        onClose={handleSuccessModalClose}
        message="체험이 삭제되었습니다."
      />

      {/* 삭제 실패 모달 */}
      <Modal
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        message="체험 삭제에 실패했습니다."
      />
    </>
  );
};

export default KebabMenu;
