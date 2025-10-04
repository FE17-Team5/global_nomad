import { HeroSection } from "../../components/Main/HeroSection";
import { SearchSection } from "../../components/Main/SearchSection";
import { PopularActivities } from "../../components/Main/PopularActivities";
import { AllActivities } from "../../components/Main/AllActivities";

const MainPage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <SearchSection />
      <PopularActivities />
      <AllActivities />
    </div>
  );
};

export default MainPage;
