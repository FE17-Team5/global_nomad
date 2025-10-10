import type { components } from "../../../types/api-types";
import ExperienceCard from "./experience-card";

const ExperienceCardList = ({
  experiences,
}: {
  experiences: components["schemas"]["ActivityBasicDto"][];
}) => {
  return (
    <div className="flex flex-col gap-6 tablet:gap-[30px]">
      {experiences.map((experience) => (
        <ExperienceCard key={experience.id} {...experience} />
      ))}
    </div>
  );
};

export default ExperienceCardList;
