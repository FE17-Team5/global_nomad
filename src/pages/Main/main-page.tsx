import { useState } from "react";
import { AllActivities } from "../../components/Main/AllActivities";
import { HeroSection } from "../../components/Main/HeroSection";
import { PopularActivities } from "../../components/Main/PopularActivities";
import { SearchSection } from "../../components/Main/SearchSection";

const MainPage = () => {
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
  };

  return (
    <div className="min-h-screen pb-[218px]">
      <HeroSection />
      <SearchSection onSearch={handleSearch} />
      <PopularActivities searchKeyword={searchKeyword} />
      <div id="all-activities">
        <AllActivities searchKeyword={searchKeyword} />
      </div>
    </div>
  );
};

export default MainPage;
