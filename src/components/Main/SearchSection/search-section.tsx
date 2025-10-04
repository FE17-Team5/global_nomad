import { useState } from "react";
import searchIcon from "../../../assets/icon/icon_search.svg";

const SearchSection = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 실제 검색 로직 구현
    console.log("검색어:", searchTerm);
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
              <div className="w-full rounded-2xl border border-gray-300 bg-white min-h-0">
                {/* Search Container */}
                <div className="flex items-center justify-between gap-2 min-h-0 py-1.5 pl-5 pr-2">
                  {/* Left Side: Icon + Input */}
                  <div className="flex items-center gap-2 flex-1 min-w-0">
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
                      className="flex-1 min-w-0 bg-transparent border-none outline-none
                               ty-16_M text-gray-950 placeholder:text-gray-400"
                      style={{
                        width: "clamp(130px, 35vw, 400px)"
                      }}
                    />
                  </div>

                  {/* Right Side: Search Button */}
                  <div className="flex items-center">
                    {/* Search Button - Desktop & Tablet */}
                    <button
                      type="submit"
                      className="sm-mobile:hidden flex-shrink-0 h-[3.125rem] py-3.5 px-6
                               bg-primary-500 hover:bg-primary-600
                               text-white rounded-[0.875rem] ty-16_B
                               transition-colors duration-200
                               focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                               whitespace-nowrap"
                    >
                      검색하기
                    </button>

                    {/* Search Button - Mobile */}
                    <button
                      type="submit"
                      className="hidden sm-mobile:block h-auto py-3.5 px-4
                               bg-primary-500 hover:bg-primary-600
                               text-white rounded-[0.75rem] ty-14_B
                               transition-colors duration-200
                               focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                               whitespace-nowrap"
                    >
                      검색하기
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
