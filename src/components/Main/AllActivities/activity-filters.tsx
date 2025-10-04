import Dropdown from "../../Dropdown/dropdown";

interface ActivityFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

const ActivityFilters = ({
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
}: ActivityFiltersProps) => {
  const categories = [
    { value: "", label: "전체" },
    { value: "문화 · 예술", label: "문화 · 예술" },
    { value: "식음료", label: "식음료" },
    { value: "스포츠", label: "스포츠" },
    { value: "투어", label: "투어" },
    { value: "관광", label: "관광" },
    { value: "웰빙", label: "웰빙" },
  ];

  const sortOptions = [
    { value: "latest", label: "최신순" },
    { value: "most_reviewed", label: "후기 많은 순" },
    { value: "price_asc", label: "가격 낮은 순" },
    { value: "price_desc", label: "가격 높은 순" },
    { value: "rating_desc", label: "평점 높은 순" },
  ];

  return (
    <div className="flex items-center justify-between mb-6 sm-tablet:mb-4 sm-mobile:flex-col sm-mobile:items-start sm-mobile:gap-4">
      {/* Category Filters - Left / Mobile: Horizontal Scroll */}
      <div className="flex gap-2 sm-tablet:flex-wrap sm-mobile:overflow-x-auto sm-mobile:scrollbar-hide sm-mobile:w-full sm-mobile:pb-2">
        <div className="flex gap-2 sm-mobile:flex-nowrap sm-mobile:min-w-max">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => onCategoryChange(category.value)}
              className={`px-4 py-2 rounded-full border transition-colors duration-200 whitespace-nowrap sm-mobile:text-[0.875rem] ${
                selectedCategory === category.value
                  ? "bg-primary-500 text-white border-primary-500"
                  : "bg-white text-gray-700 border-gray-300 hover:border-primary-300"
              }`}
              style={{
                fontFamily: 'Pretendard',
                fontSize: '1rem', // 16px
                fontWeight: 500,
                lineHeight: '100%',
                letterSpacing: '-2.5%',
                textAlign: 'center',
              }}
            >
              {category.label}
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
                  fontFamily: 'Pretendard',
                  fontSize: '1rem', // 16px
                  fontWeight: 500,
                  lineHeight: '100%',
                  letterSpacing: '-2.5%',
                  textAlign: 'center',
                }}
              >
                {sortOptions.find(option => option.value === sortBy)?.label}
              </span>
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                <path d="M1 1.5L6 6.5L11 1.5" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          }
          items={sortOptions.map(option => ({
            label: option.label,
            onClick: () => onSortChange(option.value)
          }))}
        />
      </div>
    </div>
  );
};

export default ActivityFilters;