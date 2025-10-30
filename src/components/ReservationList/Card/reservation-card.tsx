import type { components } from "../../../types/api-types";
import { dateCalc } from "../../../utils/date-time";
import ReviewModal from "../../Review/review";
import { ConfirmModal } from "../../Modal";
import { useReservationCard } from "./useReservationCard";

const ReservationCard = (
  props: components["schemas"]["ReservationWithActivityResponseDto"]
) => {
  const {
    id,
    status,
    activity,
    date,
    startTime,
    endTime,
    totalPrice,
    headCount,
    reviewSubmitted,
  } = props;

  const [
    cancelMutation,
    queryClient,
    filterStatus,
    isOpen,
    handleModalOpen,
    handleModalClose,
  ] = useReservationCard(status);

  return (
    <div className="flex flex-col items-start gap-3">
      <span className="hidden px-2 tablet:block ty-16_B text-gray-800">
        {dateCalc(date)}
      </span>
      <div className="w-full shadow-[0_4px_24px_0_#9CB4CA33] rounded-4xl tablet:rounded-3xl">
        <div className="max-w-[76%] rounded-4xl relative ">
          <div className="flex flex-col gap-2 px-[40px] py-[30px] items-start rounded-4xl bg-white relative z-10 tablet:p-5 tablet:rounded-3xl">
            <span
              className={`px-2 py-1 ty-13_B rounded-[100px] ${filterStatus?.badgeBg} ${filterStatus?.badgeTextColor}`}
            >
              {filterStatus?.title}
            </span>
            <h3 className="ty-18_B text-gray-950 tablet:ty-14_B">
              {activity.title}
            </h3>
            <div className="flex gap-2 ty-16_M text-gray-500 tablet:ty-13_M">
              <span className="tablet:hidden">{dateCalc(date)}</span>
              <span className="tablet:hidden">∙</span>
              <span>
                {startTime} - {endTime}
              </span>
            </div>
            <div className="w-full flex justify-between">
              <div className="flex items-center gap-1">
                <h5 className="ty-18_B text-gray-950">
                  ₩{totalPrice.toLocaleString()}
                </h5>
                <h5 className="ty-16_M text-gray-400">{headCount}명</h5>
              </div>
              <div className="flex gap-2 tablet:hidden">
                {filterStatus?.status === "pending" && (
                  <button
                    type="button"
                    name="cancel"
                    onClick={handleModalOpen}
                    className="px-2.5 py-1.5 rounded-[8px] border border-gray-50 bg-gray-50 ty-14_M text-gray-600 cursor-pointer
                      transition transform duration-200 hover:scale-105 hover:shadow-md"
                  >
                    예약 취소
                  </button>
                )}
                {filterStatus?.status === "completed" && !reviewSubmitted && (
                  <button
                    type="button"
                    name="review"
                    onClick={handleModalOpen}
                    className="px-2.5 py-1.5 rounded-[8px] bg-primary-500 ty-14_M text-white cursor-pointer
                    transition transform duration-200 hover:scale-105 hover:shadow-md"
                  >
                    후기 작성
                  </button>
                )}
              </div>
            </div>
          </div>
          <img
            src={activity.bannerImageUrl}
            alt="사진"
            className="bg-gray-50 bg-center bg-no-repeat bg-cover h-full w-full max-w-[38%] absolute top-0 -right-[32%] z-0 rounded-tr-4xl rounded-br-4xl 
             tablet:rounded-tr-3xl tablet:rounded-br-3xl"
          />
        </div>
      </div>
      <div className="hidden w-full tablet:flex tablet:gap-3">
        {filterStatus?.status === "pending" && (
          <button
            type="button"
            name="cancel"
            onClick={handleModalOpen}
            className="grow p-2.5 rounded-[8px] border border-gray-50 bg-gray-50 ty-14_M text-gray-600 cursor-pointer
              transition transform duration-200 hover:scale-105 hover:shadow-md"
          >
            예약 취소
          </button>
        )}
        {filterStatus?.status === "completed" && !reviewSubmitted && (
          <button
            type="button"
            name="review"
            onClick={handleModalOpen}
            className="grow p-2.5 rounded-[8px] bg-primary-500 ty-14_M text-white cursor-pointer
            transition transform duration-200 hover:scale-105 hover:shadow-md"
          >
            후기 작성
          </button>
        )}
      </div>
      <ConfirmModal
        message="예약을 취소하시겠어요?"
        confirmText="취소하기"
        isOpen={isOpen.cancel}
        onClose={() => handleModalClose("cancel")}
        onConfirm={() => {
          cancelMutation.mutate(id, {
            onSuccess: () => {
              queryClient.invalidateQueries({
                queryKey: ["my-reservations"],
              });
              handleModalClose("cancel");
            },
          });
        }}
      />
      <ReviewModal
        {...props}
        isOpen={isOpen.review}
        onClose={() => handleModalClose("review")}
      />
    </div>
  );
};

export default ReservationCard;
