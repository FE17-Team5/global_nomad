/**
 * 메인 페이지 컴포넌트
 *
 * 홈 화면을 구성하는 메인 페이지
 * - 히어로 섹션: 이달의 인기 체험 배너
 * - 검색 섹션: 체험 검색 기능
 * - 인기 체험: 리뷰 많은 순으로 정렬된 체험 목록
 * - 모든 체험: 카테고리 필터와 정렬 옵션이 있는 전체 체험 목록
 */

import { useState } from "react";
import { AllActivities } from "../../components/Main/AllActivities";
import { HeroCarousel } from "../../components/Main/HeroSection";
import { PopularActivities } from "../../components/Main/PopularActivities";
import { SearchSection } from "../../components/Main/SearchSection";
import { CloudBackground } from "../../components/Main/CloudBackground";

const MainPage = () => {
  // 검색 키워드 상태 관리
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  // 검색어 업데이트 핸들러
  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
  };

  return (
    <div className="min-h-screen pb-[218px] relative">
      <CloudBackground />
      <div className="relative z-10">
        <HeroCarousel />
        <SearchSection onSearch={handleSearch} />
        {/* 검색 중이 아닐 때만 인기 체험 표시 */}
        {!searchKeyword && <PopularActivities />}
        <div id="all-activities">
          <AllActivities searchKeyword={searchKeyword} />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
