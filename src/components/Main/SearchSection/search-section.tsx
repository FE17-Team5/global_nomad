/**
 * 검색 섹션 컴포넌트
 *
 * 메인 페이지의 체험 검색 기능을 제공하는 컴포넌트
 * - 검색 아이콘과 입력 필드
 * - 검색 버튼 (데스크탑/태블릿, 모바일 별도)
 * - 추천 키워드 드롭다운 (초성 검색 지원)
 * - 키보드 네비게이션 (Tab, Arrow, Enter, Escape)
 * - 검색어 입력 시 부모 컴포넌트로 전달
 */

import { useState, useEffect, useRef, useMemo } from "react";
import searchIcon from "../../../assets/icon/icon_search.svg";
import { useActivitiesList } from "../../../hooks/queries/useActivitiesList";
import { matchKoreanSearch } from "../../../utils/korean-search";

interface SearchSectionProps {
  onSearch: (keyword: string) => void;
}

const SearchSection = ({ onSearch }: SearchSectionProps) => {
  // 검색어 상태
  const [searchTerm, setSearchTerm] = useState("");
  // 드롭다운 표시 여부
  const [showDropdown, setShowDropdown] = useState(false);
  // 선택된 제안 인덱스
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // Refs
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 전체 체험 데이터 가져오기 (추천 키워드용)
  const { data: response, isLoading } = useActivitiesList({
    method: "offset",
    page: 1,
    size: 100,
  });

  const allActivities = response?.activities || [];

  // 추천 키워드 필터링 (초성 검색 지원)
  const suggestions = useMemo(() => {
    if (!searchTerm.trim()) return [];

    // 한글 초성 검색으로 필터링
    const filtered = allActivities
      .filter((activity) => matchKoreanSearch(activity.title, searchTerm))
      .map((activity) => activity.title)
      // 중복 제거
      .filter((title, index, self) => self.indexOf(title) === index)
      // 최대 8개만 표시
      .slice(0, 8);

    return filtered;
  }, [allActivities, searchTerm]);

  // 검색 폼 제출 핸들러
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedKeyword = searchTerm.trim();
    // 검색어가 있든 없든 onSearch 호출 (빈 문자열이면 전체 표시)
    onSearch(trimmedKeyword);
    setShowDropdown(false);
    setSelectedIndex(-1);
  };

  // 제안 선택 핸들러
  const handleSelectSuggestion = (suggestion: string) => {
    setSearchTerm(suggestion);
    setShowDropdown(false);
    setSelectedIndex(-1);
    onSearch(suggestion);
    inputRef.current?.focus();
  };

  // 입력 변경 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowDropdown(value.trim().length > 0);
    setSelectedIndex(-1);
  };

  // 키보드 이벤트 핸들러
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown || suggestions.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case "Tab":
        if (suggestions.length > 0) {
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < suggestions.length - 1 ? prev + 1 : 0
          );
        }
        break;
      case "Enter":
        if (selectedIndex >= 0) {
          e.preventDefault();
          handleSelectSuggestion(suggestions[selectedIndex]);
        }
        break;
      case "Escape":
        setShowDropdown(false);
        setSelectedIndex(-1);
        break;
    }
  };

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 선택된 항목 스크롤
  useEffect(() => {
    if (selectedIndex >= 0 && dropdownRef.current) {
      const selectedElement = dropdownRef.current.children[
        selectedIndex
      ] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    }
  }, [selectedIndex]);

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
            <form onSubmit={handleSearch} className="w-full relative">
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
                      ref={inputRef}
                      type="text"
                      value={searchTerm}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      placeholder="내가 원하는 체험은"
                      className="flex-1 min-w-0 py-4 sm-mobile:py-3 bg-transparent border-none outline-none
                               ty-16_M text-gray-950 placeholder:text-gray-400"
                      style={{
                        width: "clamp(130px, 35vw, 400px)",
                      }}
                      autoComplete="off"
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

              {/* 추천 키워드 드롭다운 */}
              {showDropdown && suggestions.length > 0 && (
                <div
                  ref={dropdownRef}
                  className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-lg z-50 max-h-[300px] overflow-y-auto"
                >
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={`${suggestion}-${index}`}
                      type="button"
                      onClick={() => handleSelectSuggestion(suggestion)}
                      className={`w-full px-6 py-3 text-left ty-16_M transition-colors duration-150 ${
                        index === selectedIndex
                          ? "bg-primary-100 text-primary-700"
                          : "text-gray-950 hover:bg-primary-50"
                      } ${index === 0 ? "rounded-t-2xl" : ""} ${
                        index === suggestions.length - 1 ? "rounded-b-2xl" : ""
                      } border-b border-gray-100 last:border-b-0`}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              {/* 검색 결과 없음 메시지 */}
              {showDropdown &&
                searchTerm.trim().length > 0 &&
                suggestions.length === 0 &&
                !isLoading && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-lg z-50 px-6 py-4">
                    <p className="ty-14_M text-gray-500 text-center">
                      검색 결과가 없습니다
                    </p>
                  </div>
                )}

              {/* 로딩 상태 */}
              {showDropdown && isLoading && searchTerm.trim().length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-lg z-50 px-6 py-4">
                  <div className="flex items-center justify-center">
                    <div className="w-6 h-6 border-3 border-primary-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
