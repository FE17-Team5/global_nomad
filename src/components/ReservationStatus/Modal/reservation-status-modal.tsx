import { dateCalc2 } from "../../../utils/date-time";
import CustomModal from "../../Modal/custom-modal";
import closeBtn from "../../../assets/icon/icon_delete.svg";

const ReservationStatusModal = ({
  date,
  isOpen,
  onClose,
}: {
  date: Date;
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <CustomModal
      withAnimation={true}
      containerClassName="fixed inset-0 z-50 flex items-center justify-center bg-black/50 tablet:items-end"
      modalClassName="w-full max-w-[340px] flex flex-col px-[30px] py-[24px] rounded-[30px] shadow-[0_4px_24px_0_#9CB4CA33]
      tablet:max-w-full tablet:rounded-b-[0px]"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex flex-col gap-[30px]">
        <div className="flex justify-between">
          <h3 className="ty-20_B">{dateCalc2(date.toString())}</h3>
          <img
            src={closeBtn}
            alt="close-button"
            onClick={onClose}
            width={24}
            height={24}
          />
        </div>
        <div className="flex gap-2 border-b border-gray-100">
          <button className="grow px-3.5 py-2.5 ty-16_B focus:text-primary-500 focus:border-b-2 focus:border-primary-500">
            신청 2
          </button>
          <button className="grow px-3.5 py-2.5 ty-16_B focus:text-primary-500 focus:border-b-2 focus:border-primary-500">
            승인 0
          </button>
          <button className="grow px-3.5 py-2.5 ty-16_B focus:text-primary-500 focus:border-b-2 focus:border-primary-500">
            거절 0
          </button>
        </div>
        <div className="flex flex-col gap-[30px] tablet:flex-row mobile:flex-col">
          <div className="flex flex-col gap-3 tablet:grow mobile:grow-0">
            <label htmlFor="time" className="ty-18_B">
              예약 시간
            </label>
            <select
              name="time"
              id="time"
              className="px-5 py-4 border border-gray-100 rounded-2xl shadow-[0_2px_6px_0_#00000005]"
            >
              <option value="0">14:00 - 15:00</option>
              <option value="1">15:00 - 16:00</option>
            </select>
          </div>
          <div className="flex flex-col gap-3 tablet:grow mobile:grow-0">
            <h3 className="flex gap-3 ty-18_B">예약 내역</h3>
            <div className="max-h-[214px] flex flex-col gap-3.5 overflow-auto">
              <div className="w-full flex px-4 py-3.5 justify-between items-center border border-gray-100 rounded-2xl">
                <div className="flex gap-2.5">
                  <div className="flex flex-col gap-2">
                    <span className="ty-16_B text-gray-500">닉네임</span>
                    <span className="ty-16_B text-gray-500">인원</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="ty-16_M text-[#1b1b1b]">정만철</span>
                    <span className="ty-16_M text-[#1b1b1b]">10명</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button className="px-2.5 py-1.5 border border-gray-50 rounded-[8px] ty-14_M text-gray-600">
                    승인하기
                  </button>
                  <button className="px-2.5 py-1.5 border border-gray-50 rounded-[8px] ty-14_M bg-gray-50 text-gray-600">
                    거절하기
                  </button>
                </div>
              </div>
              <div className="w-full flex px-4 py-3.5 justify-between items-center border border-gray-100 rounded-2xl">
                <div className="flex gap-2.5">
                  <div className="flex flex-col gap-2">
                    <span className="ty-16_B text-gray-500">닉네임</span>
                    <span className="ty-16_B text-gray-500">인원</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="ty-16_M text-[#1b1b1b]">정만철</span>
                    <span className="ty-16_M text-[#1b1b1b]">10명</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button className="px-2.5 py-1.5 border border-gray-50 rounded-[8px] ty-14_M text-gray-600">
                    승인하기
                  </button>
                  <button className="px-2.5 py-1.5 border border-gray-50 rounded-[8px] ty-14_M bg-gray-50 text-gray-600">
                    거절하기
                  </button>
                </div>
              </div>
              <div className="w-full flex px-4 py-3.5 justify-between items-center border border-gray-100 rounded-2xl">
                <div className="flex gap-2.5">
                  <div className="flex flex-col gap-2">
                    <span className="ty-16_B text-gray-500">닉네임</span>
                    <span className="ty-16_B text-gray-500">인원</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="ty-16_M text-[#1b1b1b]">정만철</span>
                    <span className="ty-16_M text-[#1b1b1b]">10명</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button className="px-2.5 py-1.5 border border-gray-50 rounded-[8px] ty-14_M text-gray-600">
                    승인하기
                  </button>
                  <button className="px-2.5 py-1.5 border border-gray-50 rounded-[8px] ty-14_M bg-gray-50 text-gray-600">
                    거절하기
                  </button>
                </div>
              </div>
              <div className="w-full flex px-4 py-3.5 justify-between items-center border border-gray-100 rounded-2xl">
                <div className="flex gap-2.5">
                  <div className="flex flex-col gap-2">
                    <span className="ty-16_B text-gray-500">닉네임</span>
                    <span className="ty-16_B text-gray-500">인원</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="ty-16_M text-[#1b1b1b]">정만철</span>
                    <span className="ty-16_M text-[#1b1b1b]">10명</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button className="px-2.5 py-1.5 border border-gray-50 rounded-[8px] ty-14_M text-gray-600">
                    승인하기
                  </button>
                  <button className="px-2.5 py-1.5 border border-gray-50 rounded-[8px] ty-14_M bg-gray-50 text-gray-600">
                    거절하기
                  </button>
                </div>
              </div>
              <div className="w-full flex px-4 py-3.5 justify-between items-center border border-gray-100 rounded-2xl">
                <div className="flex gap-2.5">
                  <div className="flex flex-col gap-2">
                    <span className="ty-16_B text-gray-500">닉네임</span>
                    <span className="ty-16_B text-gray-500">인원</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="ty-16_M text-[#1b1b1b]">정만철</span>
                    <span className="ty-16_M text-[#1b1b1b]">10명</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button className="px-2.5 py-1.5 border border-gray-50 rounded-[8px] ty-14_M text-gray-600">
                    승인하기
                  </button>
                  <button className="px-2.5 py-1.5 border border-gray-50 rounded-[8px] ty-14_M bg-gray-50 text-gray-600">
                    거절하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CustomModal>
  );
};

export default ReservationStatusModal;
