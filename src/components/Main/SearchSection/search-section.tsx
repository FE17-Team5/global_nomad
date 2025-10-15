import { useState } from "react";
import searchIcon from "../../../assets/icon/icon_search.svg";

interface SearchSectionProps {
  onSearch: (keyword: string) => void;
}

const SearchSection = ({ onSearch }: SearchSectionProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedKeyword = searchTerm.trim();
    // 검색어가 있든 없든 onSearch 호출 (빈 문자열이면 전체 표시)
    onSearch(trimmedKeyword);
  };

  return (
    <section className="w-full bg-transparent pt-[3.125rem] sm-tablet:pt-[1.875rem] sm-mobile:pt-[1.0625rem]">
      <div className="flex justify-center px-[2.5rem] sm-tablet:px-[1.875rem] sm-mobile:px-6">
        <div className="w-[75rem] sm-tablet:w-[46.5rem] sm-mobile:w-[23.4375rem] px-0 sm-tablet:px-0 sm-mobile:px-0">
          {/* Section Content */}
          <div className="flex flex-col items-center gap-9 sm-mobile:gap-3 py-4 rounded-2xl">
            {/* Section Title */}
            <h2 className="ty-32_B sm-tablet:ty-24_B sm-mobile:ty-16_B text-gray-950 text-center leading-none">
              무엇을 체험하고 싶으신가요?
            </h2>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="w-full">
              <div className="w-full rounded-2xl border border-gray-300 bg-white">
                {/* Search Container */}
                <div className="flex items-center justify-between gap-2 h-[3.625rem] sm-mobile:h-auto sm-mobile:py-1.5 pl-5 pr-2">
                  {/* Left Side: Icon + Input */}
                  <div className="flex items-center gap-2 flex-1 min-w-0 h-full">
                    {/* Search Icon */}
                    <img
                      src={searchIcon}
                      alt=""
                      role="presentation"
                      className="w-6 h-6 flex-shrink-0"
                    />

                    {/* Search Input */}
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="내가 원하는 체험은"
                      className="flex-1 min-w-0 h-full bg-transparent border-none outline-none
                               ty-16_M text-gray-950 placeholder:text-gray-400"
                      style={{
                        width: "clamp(130px, 35vw, 400px)",
                      }}
                    />
                  </div>

                  {/* Right Side: Search Button */}
                  <div className="flex items-center">
                    {/* Search Button - Desktop & Tablet */}
                    <button
                      type="submit"
                      className="sm-mobile:hidden flex-shrink-0 h-[3.125rem] py-3.5 px-6
                               bg-primary-500 text-white rounded-[0.875rem] ty-16_B
                               transition-all duration-150
                               focus:outline-none active:scale-95
                               whitespace-nowrap
                               relative overflow-hidden
                               before:absolute before:inset-0 before:bg-black/0
                               hover:before:bg-black/10 active:before:bg-black/25
                               before:transition-colors before:duration-150"
                    >
                      <span className="relative z-10">검색하기</span>
                    </button>

                    {/* Search Button - Mobile */}
                    <button
                      type="submit"
                      className="hidden sm-mobile:block h-auto py-3.5 px-4
                               bg-primary-500 text-white rounded-[0.75rem] ty-14_B
                               transition-all duration-150
                               focus:outline-none active:scale-95
                               whitespace-nowrap
                               relative overflow-hidden
                               before:absolute before:inset-0 before:bg-black/0
                               hover:before:bg-black/10 active:before:bg-black/25
                               before:transition-colors before:duration-150"
                    >
                      <span className="relative z-10">검색하기</span>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
