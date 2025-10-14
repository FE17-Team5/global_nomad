import type { components } from "../../../types/api-types";
import ExperienceCard from "./experience-card";

const ExperienceCardList = ({
  experiences,
  onDeleteSuccess,
}: {
  experiences: components["schemas"]["ActivityBasicDto"][];
  onDeleteSuccess: () => void;
}) => {
  return (
    <div className="flex flex-col gap-6 tablet:gap-[30px]">
      {experiences.map((experience) => (
        <ExperienceCard
          key={experience.id}
          {...experience}
          onDeleteSuccess={onDeleteSuccess}
        />
      ))}
    </div>
  );
};

export default ExperienceCardList;
