import type { components } from "../../../types/api-types";
import type { FilterListType } from "../filter-data";

const FilterBadge = ({
  status,
  title,
  selectedBadge,
  onClick,
}: FilterListType & {
  selectedBadge: components["schemas"]["ReservationStatus"] | null;
  onClick: (status: components["schemas"]["ReservationStatus"] | null) => void;
}) => {
  const handleClick = () => {
    onClick(status);
  };
  return (
    <button
      onClick={handleClick}
      className={`px-4 py-2.5 border border-[#D8D8D8] rounded-[100px] 
      ty-16_M tracking-tighter cursor-pointer hover:text-white hover:bg-[#333333]
       ${
         selectedBadge === status
           ? "text-white bg-[#333333]"
           : "text-gray-950 bg-white"
       }`}
    >
      {title}
    </button>
  );
};

export default FilterBadge;
