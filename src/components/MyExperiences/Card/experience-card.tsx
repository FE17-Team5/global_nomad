import { Link } from "react-router-dom";
import star from "../../../assets/icon/icon_star_on.svg";
import sampleImg from "../../../assets/img/image8.png";
import type { components } from "../../../types/api-types";
import { ConfirmModal, Modal } from "../../Modal";
import { useExperienceCard } from "./useExperienceCard";

const ExperienceCard = ({
  id,
  title,
  rating,
  reviewCount,
  price,
  bannerImageUrl,
  onDeleteSuccess,
}: components["schemas"]["ActivityBasicDto"] & {
  onDeleteSuccess: () => void;
}) => {
  const [
    isConfirmOpen,
    isErrorModalOpen,
    errorMessage,
    isCheckingReservations,
    setIsErrorModalOpen,
    handleDelete,
    handleModalClose,
    handleModalOpen,
  ] = useExperienceCard(id, onDeleteSuccess);

  return (
    <>
      <div className="flex justify-between items-center p-[30px] rounded-3xl shadow-[0_4px_24px_0_#9CB4CA33] tablet:p-6 tablet:gap-[22px] tablet:items-start">
        <div className="flex flex-col gap-5 tablet:gap-3">
          <h3 className="ty-18_B text-gray-950 tablet:ty-16_B">{title}</h3>
          <div className="flex items-center gap-0.5 ty-16_M text-gray-400 tablet:ty-13_M">
            <img src={star} alt="별점" className="w-4 h-4" />
            <span>{rating}</span>
            <span>({reviewCount})</span>
          </div>
          <div className="flex gap-1 items-center">
            <span className="ty-18_B text-gray_950">
              ₩{price.toLocaleString()}
            </span>
            <span className="ty-16_M text-gray-400 tablet:ty-14_M">/</span>
            <span className="ty-16_M text-gray-400 tablet:ty-14_M">인</span>
          </div>
          <div className="flex gap-2">
            <Link
              to={`/myprofile/edit?id=${id}`}
              state={{ returnTo: "myprofile" }}
              className="px-2.5 py-1.5 border border-gray-50 rounded-[8px] ty-14_M text-gray-600 cursor-pointer
              transition transform duration-200 hover:scale-105 hover:shadow-md"
            >
              수정하기
            </Link>
            <button
              type="button"
              onClick={handleModalOpen}
              disabled={isCheckingReservations}
              className="px-2.5 py-1.5 bg-gray-50 rounded-[8px] ty-14_M text-gray-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed
              transition transform duration-200 hover:scale-105 hover:shadow-md"
            >
              {isCheckingReservations ? "확인 중..." : "삭제하기"}
            </button>
          </div>
        </div>
        <img
          src={bannerImageUrl || sampleImg}
          alt={title}
          className="w-[142px] h-[142px] rounded-4xl object-cover tablet:w-[82px] tablet:h-[82px] tablet:rounded-[20px]"
        />
      </div>

      <ConfirmModal
        message="정말 삭제하시겠습니까?"
        confirmText="삭제하기"
        isOpen={isConfirmOpen}
        onClose={handleModalClose}
        onConfirm={handleDelete}
      />

      <Modal
        message={errorMessage}
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
      />
    </>
  );
};

export default ExperienceCard;
