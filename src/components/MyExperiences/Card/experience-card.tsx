import type { components } from "../../../types/api-types";
import { Link } from "react-router-dom";
import star from "../../../assets/icon/icon_star_on.svg";
import sampleImg from "../../../assets/img/image8.png";
import { ConfirmModal } from "../../Modal";
import { useState } from "react";

const ExperienceCard = ({
  title,
  rating,
  reviewCount,
  price,
}: components["schemas"]["ActivityBasicDto"]) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex justify-between items-center p-[30px] rounded-3xl shadow-[0_4px_24px_0_#9CB4CA33] tablet:p-6 tablet:gap-[22px] tablet:items-start">
      <div className="flex flex-col gap-5 tablet:gap-3">
        <h3 className="ty-18_B text-gray-950 tablet:ty-16_B">{title}</h3>
        <div className="flex items-center gap-0.5 ty-16_M text-gray-400 tablet:ty-13_M">
          <img src={star} alt="별점" className="w-4 h-4" />
          <span>{rating}</span>
          <span>({reviewCount})</span>
        </div>
        <div className="flex gap-1 items-center">
          <span className="ty-18_B text-gray_950">₩{price}</span>
          <span className="ty-16_M text-gray-400 tablet:ty-14_M">/</span>
          <span className="ty-16_M text-gray-400 tablet:ty-14_M">인</span>
        </div>
        <div className="flex gap-2">
          <Link
            to={"edit"}
            className="px-2.5 py-1.5 border border-gray-50 rounded-[8px] ty-14_M text-gray-600 cursor-pointer"
          >
            수정하기
          </Link>
          <button
            onClick={handleModalOpen}
            className="px-2.5 py-1.5 bg-gray-50 rounded-[8px] ty-14_M text-gray-600 cursor-pointer"
          >
            삭제하기
          </button>
        </div>
      </div>
      <img
        src={sampleImg}
        alt="banner image"
        className="w-[142px] h-[142px] rounded-4xl tablet:w-[82px] tablet:h-[82px] tablet:rounded-[20px]"
      />
      <ConfirmModal
        message="정말 삭제하시겠습니까?"
        confirmText="삭제하기"
        isOpen={isOpen}
        onClose={handleModalClose}
        onConfirm={() => console.log("삭제하기")}
      />
    </div>
  );
};

export default ExperienceCard;
