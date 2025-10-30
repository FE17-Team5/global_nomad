import dropdownBtn from "../../../assets/icon/icon_alt arrow_down.svg";
import type { MyActivity } from "../../../lib/my-activities/types";
import { useMyReservationDropdown } from "./useMyReservationDropdown";

const MyReservationDropdown = ({
  reservations,
  handleSchedule,
}: {
  reservations: MyActivity[] | undefined;
  handleSchedule: (id: number) => void;
}) => {
  const [isOpen, title, dropdownRef, setTitle, setIsOpen, handleItemClick] =
    useMyReservationDropdown(handleSchedule);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 flex items-center rounded-2xl border border-gray-100 shadow-[0_2px_6px_0_#00000005] cursor-pointer"
      >
        <div className="grow text-start ty-16_M mobile:ty-14_M">{title}</div>
        <img src={dropdownBtn} alt="dropdown-button" width={24} height={24} />
      </button>

      <div
        className={`absolute top-full w-full max-h-[200px] overflow-auto mt-2 bg-white rounded-lg shadow-lg z-50 transition-all duration-300 ease-out ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
        style={{
          border: "1px solid var(--color-border-light)",
        }}
        role="menu"
      >
        {reservations!.map((reservation) => (
          <div key={reservation.id}>
            <button
              type="button"
              onClick={() => {
                handleItemClick(reservation.id);
                setTitle(reservation.title);
              }}
              className={`w-full h-[55px] hover:bg-gray-25 transition-colors flex items-center justify-center ty-14_M text-gray-800 cursor-pointer ${
                reservation.id === 0 ? "rounded-t-lg" : ""
              } `}
              role="menuitem"
            >
              {reservation.title}
            </button>
            <hr
              className={`${
                reservation.id === reservations!.length - 1 && "border-none"
              } border-gray-100`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyReservationDropdown;
