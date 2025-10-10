import EmptyData from "./EmptyData/empty-data";
import { mockData } from "./mock-data";
import ExperienceCardList from "./Card/experience-card-list";

const MyExperiences = () => {
  return (
    <div>
      {mockData.length > 0 ? (
        <ExperienceCardList experiences={mockData} />
      ) : (
        <EmptyData />
      )}
    </div>
  );
};

export default MyExperiences;
