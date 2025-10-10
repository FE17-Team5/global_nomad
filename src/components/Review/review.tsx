import CustomModal from "../Modal/custom-modal";
import closeImg from "../../assets/icon/icon_delete.svg";
import type { components } from "../../types/api-types";
import { dateCalc, timeCalc } from "../../utils/date-time";
import { useState, type ChangeEvent } from "react";
import Rating from "./Rating/rating";

const ReviewModal = ({
  activity,
  date,
  startTime,
  endTime,
  headCount,
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
} & components["schemas"]["ReservationWithActivityResponseDto"]) => {
  const [input, setInput] = useState({
    review: "",
    rating: 0,
  });
  const [hoverRating, setHoverRating] = useState(0);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput((prevInput) => ({
      ...prevInput,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRatingClick = (newRating: number) => {
    setInput((prevInput) => ({
      ...prevInput,
      rating: newRating,
    }));
  };

  const handleMouseEnter = (index: number) => {
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleCLose = () => {
    setInput({
      review: "",
      rating: 0,
    });
    onClose();
  };

  const displayRating = hoverRating || input.rating;

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      containerClassName="fixed inset-0 z-50 flex items-center justify-center px-6 bg-black/50"
      modalClassName="w-full max-w-[385px] flex flex-col px-[30px] py-[24px] rounded-[30px] shadow-[0_4px_24px_0_#9CB4CA33]"
    >
      <>
        <div className="w-full flex justify-end">
          <img
            src={closeImg}
            alt="close"
            width={24}
            height={24}
            className="w-6 h-6 cursor-pointer"
            onClick={handleCLose}
          />
        </div>
        <form action="" className="flex flex-col gap-[30px]">
          <div className="flex flex-col gap-1.5 items-center">
            <h3 className="ty-16_B text-black-nomad">{activity.title}</h3>
            <div className="flex gap-1 ty-14_M text-gray-500">
              <span>{dateCalc(date)}</span>
              <span>/</span>
              <span>
                {timeCalc(startTime)} - {timeCalc(endTime)}
              </span>
              <span>({headCount}명)</span>
            </div>
            <Rating
              displayRating={displayRating}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onRatingClick={handleRatingClick}
            />
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="review" className="ty-18_B">
              소중한 경험을 들려주세요
            </label>
            <div className="flex flex-col gap-2">
              <textarea
                name="review"
                id="review"
                value={input.review}
                onChange={handleChange}
                maxLength={100}
                placeholder="체험에서 느낀 경험을 자유롭게 남겨주세요"
                className="w-full max-w-[325px] h-[179px] p-5 border border-gray-100
              shadow-[0_4px_24px_0_#9CB4CA33] rounded-xl resize-none placeholder:ty-16_M placeholder:text-gray-400"
              />
              <div className="ty-14_M text-gray-600 text-end">
                {input.review.length}/100
              </div>
            </div>
          </div>
          <button
            disabled={!input.rating && !input.review}
            className={`w-full px-[40px] py-3.5 rounded-2xl ty-16_B 
              ${
                input.rating && input.review
                  ? "text-white bg-primary-500 cursor-pointer"
                  : "bg-gray-200 text-gray-50"
              }`}
          >
            작성하기
          </button>
        </form>
      </>
    </CustomModal>
  );
};

export default ReviewModal;
