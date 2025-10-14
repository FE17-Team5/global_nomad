import { AllActivities } from "../../components/Main/AllActivities";
import { HeroSection } from "../../components/Main/HeroSection";
import { PopularActivities } from "../../components/Main/PopularActivities";
import { SearchSection } from "../../components/Main/SearchSection";

const MainPage = () => {
  return (
    <div className="min-h-screen pb-[218px]">
      <HeroSection />
      <SearchSection />
      <PopularActivities />
      <AllActivities />
    </div>
  );
};

export default MainPage;
