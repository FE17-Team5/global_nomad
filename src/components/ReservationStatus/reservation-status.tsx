import ReservationStatusCalendar from "./Calendar/reservation-status-calendar";
import EmptyData from "./EmptyData/empty-data";

const ReservationStatus = () => {
  return (
    <div className="flex flex-col gap-[30px]">
      <select
        name="title"
        id="title"
        className="px-5 py-4 border border-gray-100 rounded-2xl"
      >
        <option value="0">함께 배우며 즐거운 스트릿 댄스</option>
        <option value="1">내 강아지 인생 사진 찍어주기</option>
        <option value="2">이색 앵무새 카페에서 앵무새와 친구 되기</option>
      </select>
      <ReservationStatusCalendar />
    </div>
  );
};

export default ReservationStatus;
