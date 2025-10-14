import { useActivitiesData } from "../../../hooks/useActivitiesData";
import Dropdown from "../../Dropdown/dropdown";

const ActivityFilters = () => {
  const {
    categories,
    sortOptions,
    selectedCategories,
    selectedSort,
    handleCategoryChange,
    handleSortChange,
  } = useActivitiesData();

  return (
    <div className="flex items-center justify-between mb-6 sm-tablet:mb-4 sm-mobile:flex-col sm-mobile:items-start sm-mobile:gap-4">
      {/* Category Filters - Left / Mobile: Horizontal Scroll */}
      <div className="flex gap-2 sm-tablet:flex-wrap sm-mobile:overflow-x-auto sm-mobile:scrollbar-hide sm-mobile:w-full sm-mobile:pb-2">
        <div className="flex gap-2 sm-mobile:flex-nowrap sm-mobile:min-w-max">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-full border transition-colors duration-200 whitespace-nowrap sm-mobile:text-[0.875rem] ${
                selectedCategories.includes(category)
                  ? "bg-primary-500 text-white border-primary-500"
                  : "bg-white text-gray-700 border-gray-300 hover:border-primary-300"
              }`}
              style={{
                fontFamily: "Pretendard",
                fontSize: "1rem", // 16px
                fontWeight: 500,
                lineHeight: "100%",
                letterSpacing: "-2.5%",
                textAlign: "center",
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Sort Options - Right / Mobile: Full width */}
      <div className="sm-mobile:w-full sm-mobile:flex sm-mobile:justify-end">
        <Dropdown
          align="right"
          trigger={
            <div className="flex items-center gap-2 cursor-pointer">
              <span
                className="text-gray-700 sm-mobile:text-[0.875rem]"
                style={{
                  fontFamily: "Pretendard",
                  fontSize: "1rem", // 16px
                  fontWeight: 500,
                  lineHeight: "100%",
                  letterSpacing: "-2.5%",
                  textAlign: "center",
                }}
              >
                {
                  sortOptions.find((option) => option.value === selectedSort)
                    ?.label
                }
              </span>
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                <path
                  d="M1 1.5L6 6.5L11 1.5"
                  stroke="#9CA3AF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          }
          items={sortOptions.map((option) => ({
            label: option.label,
            onClick: () => handleSortChange(option.value),
          }))}
        />
      </div>
    </div>
  );
};

export default ActivityFilters;
