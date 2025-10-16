/**
 * 검색 섹션 컴포넌트
 *
 * 메인 페이지의 체험 검색 기능을 제공하는 컴포넌트
 * - 검색 아이콘과 입력 필드
 * - 검색 버튼 (데스크탑/태블릿, 모바일 별도)
 * - 검색어 입력 시 부모 컴포넌트로 전달
 */

import { useState } from "react";
import searchIcon from "../../../assets/icon/icon_search.svg";

interface SearchSectionProps {
  onSearch: (keyword: string) => void;
}

const SearchSection = ({ onSearch }: SearchSectionProps) => {
  // 검색어 상태
  const [searchTerm, setSearchTerm] = useState("");

  // 검색 폼 제출 핸들러
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedKeyword = searchTerm.trim();
    // 검색어가 있든 없든 onSearch 호출 (빈 문자열이면 전체 표시)
    onSearch(trimmedKeyword);
  };

  return (
    <section className="w-full bg-transparent pt-[3.125rem] sm-tablet:pt-[1.875rem] sm-mobile:pt-[1.0625rem]">
      <div className="flex justify-center px-[2.5rem] sm-tablet:px-[1.875rem] sm-mobile:px-6">
        <div className="w-[75rem] sm-tablet:w-[46.5rem] sm-mobile:w-[23.4375rem] px-10 sm-mobile:px-0">
          {/* 섹션 컨텐츠 */}
          <div className="flex flex-col items-center gap-9 sm-mobile:gap-3 py-4 rounded-2xl">
            {/* 섹션 제목 */}
            <h2 className="ty-32_B sm-tablet:ty-24_B sm-mobile:ty-16_B text-gray-950 text-center leading-none">
              무엇을 체험하고 싶으신가요?
            </h2>

            {/* 검색 폼 */}
            <form onSubmit={handleSearch} className="w-full">
              <div className="w-full rounded-[1.5rem] sm-mobile:rounded-2xl bg-white shadow-search">
                {/* 검색 컨테이너 */}
                <div className="flex items-center justify-between gap-2 min-h-[3.625rem] sm-mobile:min-h-[3rem] py-[0.625rem] pr-3 pl-8 sm-mobile:py-[0.375rem] sm-mobile:pr-2 sm-mobile:pl-5">
                  {/* 왼쪽: 검색 아이콘 + 입력 필드 */}
                  <div className="flex items-center gap-2 flex-1 min-w-0 h-full">
                    {/* 검색 아이콘 */}
                    <img
                      src={searchIcon}
                      alt=""
                      role="presentation"
                      className="w-6 h-6 flex-shrink-0"
                    />

                    {/* 검색 입력 필드 */}
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="내가 원하는 체험은"
                      className="flex-1 min-w-0 py-4 sm-mobile:py-3 bg-transparent border-none outline-none
                               ty-16_M text-gray-950 placeholder:text-gray-400"
                      style={{
                        width: "clamp(130px, 35vw, 400px)",
                      }}
                    />
                  </div>

                  {/* 오른쪽: 검색 버튼 */}
                  <div className="flex items-center">
                    {/* 검색 버튼 - 데스크탑 & 태블릿 */}
                    <button
                      type="submit"
                      className="sm-mobile:hidden flex-shrink-0 py-3.5 px-6
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

                    {/* 검색 버튼 - 모바일 */}
                    <button
                      type="submit"
                      className="hidden sm-mobile:block py-3.5 px-4
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
