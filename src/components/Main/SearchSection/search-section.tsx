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
    <section className="w-full bg-white py-[3rem] tablet:py-[2.5rem] mobile:py-[2rem]">
      <div className="flex justify-center px-[2.5rem] tablet:px-6 mobile:px-6">
        <div className="w-[75rem] tablet:w-[46.5rem] mobile:w-[29.125rem]">
          {/* Section Title */}
          <div className="text-center mb-[2.25rem] tablet:mb-[2.25rem] mobile:mb-[2.25rem]">
            <h2
              className="text-gray-950 text-center mobile:hidden"
              style={{
                fontFamily: 'Pretendard',
                fontSize: '2rem', // 32px
                fontWeight: 700,
                lineHeight: '100%',
                letterSpacing: '-2.5%'
              }}
            >
              무엇을 체험하고 싶으신가요?
            </h2>
            {/* Mobile: 16px */}
            <h2
              className="text-gray-950 text-center hidden mobile:block"
              style={{
                fontFamily: 'Pretendard',
                fontSize: '1rem', // 16px
                fontWeight: 700,
                lineHeight: '100%',
                letterSpacing: '-2.5%'
              }}
            >
              무엇을 체험하고 싶으신가요?
            </h2>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="w-full">
            <div className="relative w-full rounded-[1.5rem] border border-gray-300 bg-white"
                 style={{ padding: '0.625rem 0.75rem 0.625rem 2rem' }}>
              <div className="flex items-center justify-between gap-1">
                {/* Search Icon */}
                <img
                  src={searchIcon}
                  alt=""
                  role="presentation"
                  className="w-5 h-5 flex-shrink-0"
                />

                {/* Search Input */}
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="내가 원하는 체험은"
                  className="flex-1 min-w-0 bg-transparent border-none outline-none
                           ty-16_M text-gray-950 placeholder:text-gray-400"
                />

                {/* Search Button - Desktop & Tablet */}
                <button
                  type="submit"
                  className="mobile:hidden flex-shrink-0 h-[3.125rem]
                           bg-primary-500 hover:bg-primary-600
                           text-white
                           rounded-[0.875rem]
                           transition-colors duration-200
                           focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                           whitespace-nowrap"
                  style={{
                    padding: '0.875rem 1.5rem',
                    fontFamily: 'Pretendard',
                    fontSize: '1rem', // 16px
                    fontWeight: 700,
                    lineHeight: '100%',
                    letterSpacing: '-2.5%',
                    minWidth: 'auto',
                    width: 'auto'
                  }}
                >
                  검색하기
                </button>

                {/* Search Button - Mobile */}
                <button
                  type="submit"
                  className="hidden mobile:block flex-1 h-auto
                           bg-primary-500 hover:bg-primary-600
                           text-white
                           rounded-[0.75rem]
                           transition-colors duration-200
                           focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  style={{
                    padding: '0.875rem 2.5rem',
                    fontFamily: 'Pretendard',
                    fontSize: '0.875rem', // 14px
                    fontWeight: 700,
                    lineHeight: '100%',
                    letterSpacing: '-2.5%'
                  }}
                >
                  검색하기
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;