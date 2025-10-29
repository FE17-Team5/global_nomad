import { useUpdateReservationStatus } from "../../../hooks/mutations";
import type { components } from "../../../types/api-types";

const STATUS_TITLE = {
  pending: "예약 내역",
  confirmed: "승인 내역",
  declined: "거절 내역",
} as const;

type StatusKey = keyof typeof STATUS_TITLE;
type ReservationType = Omit<
  components["schemas"]["ReservationWithUserResponseDto"],
  "status"
> & { status: string };

const StatusContent = ({
  reservation,
  index,
  handleTitle,
}: {
  reservation: ReservationType;
  index: number;
  handleTitle: (title: string) => void;
}) => {
  const accessToken = localStorage.getItem("accessToken");
  const updateStateMutation = useUpdateReservationStatus(
    reservation.activityId,
    accessToken!
  );
  return (
    <div className="flex flex-col gap-3" key={reservation.id}>
      {index === 0 && (
        <h3 className="flex gap-3 ty-18_B">
          {STATUS_TITLE[reservation.status as StatusKey]}
        </h3>
      )}
      <div className="max-h-[214px] flex flex-col gap-3.5 overflow-auto">
        <div className="w-full flex px-4 py-3.5 justify-between items-center border border-gray-100 rounded-2xl">
          <div className="flex gap-2.5">
            <div className="flex flex-col gap-2">
              <span className="ty-16_B text-gray-500">닉네임</span>
              <span className="ty-16_B text-gray-500">인원</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="ty-16_M text-[#1b1b1b]">
                {reservation.nickname}
              </span>
              <span className="ty-16_M text-[#1b1b1b]">
                {reservation.headCount}명
              </span>
            </div>
          </div>
          {reservation.status === "pending" && (
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  updateStateMutation.mutate(
                    {
                      reservationId: reservation.id,
                      body: {
                        status: "confirmed",
                      },
                    },
                    {
                      onSuccess: () => handleTitle("시간 선택"),
                    }
                  );
                }}
                className="cursor-pointer px-2.5 py-1.5 border border-gray-50 rounded-[8px] ty-14_M text-gray-600
                transition transform duration-200 hover:scale-105 hover:shadow-md"
              >
                승인하기
              </button>
              <button
                type="button"
                onClick={() => {
                  updateStateMutation.mutate(
                    {
                      reservationId: reservation.id,
                      body: {
                        status: "declined",
                      },
                    },
                    {
                      onSuccess: () => handleTitle("시간 선택"),
                    }
                  );
                }}
                className="cursor-pointer px-2.5 py-1.5 border border-gray-50 rounded-[8px] ty-14_M bg-gray-50 text-gray-600
                transition transform duration-200 hover:scale-105 hover:shadow-md"
              >
                거절하기
              </button>
            </div>
          )}
          {reservation.status === "confirmed" && (
            <div className="px-2 py-1 bg-[#DDF9F9] text-[#1790A0] ty-13_B rounded-full">
              예약 승인
            </div>
          )}
          {reservation.status === "declined" && (
            <div className="px-2 py-1 bg-red-100 text-red-500 ty-13_B rounded-full">
              예약 거절
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusContent;
