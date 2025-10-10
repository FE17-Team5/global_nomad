import type { components } from "../../../types/api-types";
import { filterList } from "../filter-data";
import FilterBadge from "./filter-badge";

const FilterBadgeList = ({
  selectedBadge,
  onClick,
}: {
  selectedBadge: components["schemas"]["ReservationStatus"] | null;
  onClick: (status: components["schemas"]["ReservationStatus"] | null) => void;
}) => {
  return (
    <div className="w-full max-w-[483px] overflow-hidden">
      <div
        className="flex gap-2 overflow-x-auto min-w-0
    [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {filterList.map((data) => (
          <div key={data.status} className="flex-shrink-0">
            <FilterBadge
              selectedBadge={selectedBadge}
              onClick={onClick}
              {...data}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterBadgeList;
