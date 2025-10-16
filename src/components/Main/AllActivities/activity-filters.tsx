import Dropdown from "../../Dropdown/dropdown";
import iconArt from "../../../assets/icon/icon_art.svg";
import iconFood from "../../../assets/icon/icon_food.svg";
import iconSport from "../../../assets/icon/icon_sport.svg";
import iconTour from "../../../assets/icon/icon_tour.svg";
import iconBus from "../../../assets/icon/icon_bus.svg";

interface ActivityFiltersProps {
  categories: string[];
  sortOptions: { value: string; label: string }[];
  selectedCategories: string[];
  selectedSort: string;
  handleCategoryChange: (category: string) => void;
  handleSortChange: (sortValue: string) => void;
}

const ActivityFilters = ({
  categories,
  sortOptions,
  selectedCategories,
  selectedSort,
  handleCategoryChange,
  handleSortChange,
}: ActivityFiltersProps) => {

  // Category icon mapping
  const categoryIcons: Record<string, string> = {
    "문화 · 예술": iconArt,
    "식음료": iconFood,
    "스포츠": iconSport,
    "투어": iconTour,
    "관광": iconBus,
    "웰빙": iconFood, // Using food icon for wellness as fallback
  };

  return (
    <div className="flex items-center justify-between mb-6 sm-tablet:mb-4 sm-mobile:flex-col sm-mobile:items-start sm-mobile:gap-4">
      {/* Category Filters - Left / Mobile: Horizontal Scroll */}
      <div className="flex gap-2 sm-tablet:flex-wrap sm-mobile:overflow-x-auto sm-mobile:scrollbar-hide sm-mobile:w-full sm-mobile:pb-2">
        <div className="flex gap-2 sm-mobile:flex-nowrap sm-mobile:min-w-max">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2.5 rounded-full border transition-colors duration-200 whitespace-nowrap flex items-center ${
                selectedCategories.includes(category)
                  ? "bg-primary-500 text-white border-primary-500"
                  : "bg-white text-gray-700 border-[#D8D8D8] hover:border-primary-300"
              }`}
            >
              {categoryIcons[category] && (
                <img
                  src={categoryIcons[category]}
                  alt=""
                  className="w-5 h-5 mr-1.5 flex-shrink-0"
                />
              )}
              <span
                className="sm-mobile:text-[0.875rem]"
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
              </span>
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
