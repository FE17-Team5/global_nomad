import { dateCalc2 } from "../../../utils/date-time";
import CustomModal from "../../Modal/custom-modal";
import closeBtn from "../../../assets/icon/icon_delete.svg";
import ScheduleDropdown from "../Dropdown/schedule-dropdown";
import StatusContentList from "../Status/status-content-list";
import {
  STATUS_TABS,
  useReservationStatusModal,
} from "./useReservationStatusModal";

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
  const [
    reservations,
    selectedIndex,
    title,
    totalCounts,
    filteredSchedules,
    setScheduleId,
    setSelectedIndex,
    handleScheduleId,
    handleStatusClick,
    handleTitle,
  ] = useReservationStatusModal(activityId, date);

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
            className="cursor-pointer transition transform duration-200 hover:scale-105 hover:shadow-md rounded-full"
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
