import { dateCalc2 } from "../../../utils/date-time";
import CustomModal from "../../Modal/custom-modal";
import closeBtn from "../../../assets/icon/icon_delete.svg";
import { useState } from "react";
import { formatDateToString } from "../../../utils/date";
import {
  useActivityReservations,
  useReservedSchedule,
} from "../../../hooks/queries";
import ScheduleDropdown from "../Dropdown/schedule-dropdown";
import type { UpdateReservationStatusBody } from "../../../lib/my-activities/types";
import StatusContentList from "../Status/status-content-list";

const STATUS_TABS: {
  index: number;
  label: string;
  countKey: UpdateReservationStatusBody["status"];
}[] = [
  { index: 0, label: "신청", countKey: "pending" },
  { index: 1, label: "승인", countKey: "confirmed" },
  { index: 2, label: "거절", countKey: "declined" },
];

const ReservationStatusModal = ({
  date,
  activityId,
  isOpen,
  onClose,
}: {
  date: Date;
  activityId: number;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const accessToken = localStorage.getItem("accessToken");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scheduleId, setScheduleId] = useState(-1);
  const [title, setTitle] = useState("시간 선택");
  const initialCounts = { pending: 0, confirmed: 0, declined: 0 };

  const { data: schedules } = useReservedSchedule(
    activityId,
    {
      date: formatDateToString(date),
    },
    accessToken
  );

  const { data: reservations } = useActivityReservations(
    activityId,
    {
      scheduleId,
      status: STATUS_TABS[selectedIndex].countKey,
    },
    accessToken
  );

  const totalCounts = schedules?.reduce((prev, next) => {
    prev.pending += next.count.pending;
    prev.confirmed += next.count.confirmed;
    prev.declined += next.count.declined;
    return prev;
  }, initialCounts);

  const currentStatusKey = STATUS_TABS[selectedIndex].countKey;

  const filteredSchedules = schedules?.filter(
    (schedule) => schedule.count[currentStatusKey] > 0
  );

  const handleStatusClick = (index: number) => {
    setSelectedIndex(index);
    setScheduleId(-1);
    handleTitle("시간 선택");
  };

  const handleTitle = (title: string) => {
    setTitle(title);
  };

  const handleScheduleId = (scheduleId: number) => {
    setScheduleId(scheduleId);
  };
  console.log(schedules);

  return (
    <CustomModal
      withAnimation={true}
      containerClassName="fixed inset-0 z-50 flex items-center justify-center bg-black/50 tablet:items-end"
      modalClassName="w-full max-w-[340px] flex flex-col px-[30px] py-[24px] rounded-[30px] shadow-[0_4px_24px_0_#9CB4CA33]
      tablet:max-w-full tablet:min-h-[400px] tablet:rounded-b-[0px]"
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setSelectedIndex(0);
        setScheduleId(-1);
      }}
    >
      <div className="flex flex-col gap-[30px]">
        <div className="flex justify-between">
          <h3 className="ty-20_B">{dateCalc2(date.toString())}</h3>
          <button
            type="button"
            onClick={() => {
              onClose();
              setSelectedIndex(0);
              setScheduleId(-1);
            }}
            className="cursor-pointer"
          >
            <img src={closeBtn} alt="close-button" width={24} height={24} />
          </button>
        </div>
        <div className="flex gap-2 border-b border-gray-100">
          {STATUS_TABS.map(({ index, label, countKey }) => (
            <button
              key={index}
              type="button"
              onClick={() => handleStatusClick(index)}
              className={`grow px-3.5 py-2.5 ty-16_B cursor-pointer ${
                selectedIndex === index
                  ? "text-primary-500 border-b-2 border-primary-500"
                  : ""
              }`}
            >
              {label} {totalCounts?.[countKey]}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-[30px] tablet:flex-row mobile:flex-col">
          <div className="flex flex-col gap-3 tablet:grow mobile:grow-0">
            <ScheduleDropdown
              title={title}
              schedules={filteredSchedules}
              handleTitle={handleTitle}
              handleSchedule={handleScheduleId}
            />
          </div>
          {reservations && (
            <StatusContentList
              reservations={reservations.reservations}
              handleTitle={handleTitle}
            />
          )}
        </div>
      </div>
    </CustomModal>
  );
};

export default ReservationStatusModal;
