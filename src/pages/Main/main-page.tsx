import { HeroSection } from "../../components/Main/HeroSection";
import { SearchSection } from "../../components/Main/SearchSection";

const MainPage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <SearchSection />
      {/* TODO: PopularActivities 섹션 추가 예정 */}
      {/* TODO: AllActivities 섹션 추가 예정 */}
    </div>
  );
};

export default MainPage;
