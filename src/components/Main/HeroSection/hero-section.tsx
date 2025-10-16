import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useActivitiesList } from "../../../hooks/queries/useActivitiesList";
import heroImage from "../../../assets/img/image2.png";

const HeroSection = () => {
  // Fetch activities sorted by rating (highest first)
  const { data: response } = useActivitiesList({
    method: "offset",
    page: 1,
    size: 100,
    sort: "most_reviewed",
  });

  // Find the activity with highest rating, then most reviews
  const topActivity = useMemo(() => {
    if (!response?.activities || response.activities.length === 0) {
      return null;
    }

    // Sort by rating (desc), then by reviewCount (desc)
    const sorted = [...response.activities].sort((a, b) => {
      if (b.rating !== a.rating) {
        return b.rating - a.rating;
      }
      return b.reviewCount - a.reviewCount;
    });

    return sorted[0];
  }, [response]);

  // Get current month in Korean
  const currentMonth = useMemo(() => {
    const month = new Date().getMonth() + 1;
    return `${month}월`;
  }, []);

  // Use top activity data or fallback to default
  const activityTitle = topActivity?.title || "함께 배우고 즐기는 스트릿 댄스";
  const activityImage = topActivity?.bannerImageUrl || heroImage;

  return (
    <section
      className="w-full bg-transparent"
      style={{
        paddingTop: "clamp(4.625rem, 15vw, 6.4375rem)",
      }}
    >
      <div className="flex justify-center px-[2.5rem] sm-tablet:px-[1.875rem] sm-mobile:px-6">
        <div className="w-[75rem] sm-tablet:w-[46.5rem] sm-mobile:w-[29.125rem] px-0 sm-tablet:px-0 sm-mobile:px-0">
          {/* Hero Image Container */}
          <Link
            to={topActivity ? `/detail/${topActivity.id}` : "#"}
            className="relative w-full h-[31.25rem] sm-tablet:h-[23.4375rem] sm-mobile:h-[11.3125rem] rounded-[1.5rem] sm-tablet:rounded-[1.125rem] sm-mobile:rounded-[0.75rem] overflow-hidden shadow-card hover:shadow-lg transition-shadow duration-200 block cursor-pointer"
          >
            {/* Background Image */}
            <img
              src={activityImage}
              alt=""
              role="presentation"
              className="w-full h-full object-cover"
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Content - Desktop */}
            <div className="absolute inset-0 sm-tablet:hidden sm-mobile:hidden">
              {/* Main Title - Desktop */}
              <h1
                className="ty-32_B text-white text-center absolute left-1/2 -translate-x-1/2 whitespace-nowrap"
                style={{ top: "321px" }}
              >
                {activityTitle}
              </h1>

              {/* Subtitle - Desktop */}
              <p
                className="ty-18_M text-white/90 flex items-center justify-center gap-1 absolute left-1/2 -translate-x-1/2 whitespace-nowrap"
                style={{ top: "378px" }}
              >
                {currentMonth}의 인기 체험 BEST
                <span aria-label="불꽃">
                  🔥
                </span>
              </p>
            </div>

            {/* Content - Tablet */}
            <div className="absolute inset-0 hidden sm-tablet:block sm-mobile:hidden">
              {/* Main Title - Tablet */}
              <h1
                className="ty-24_B text-white text-center absolute left-1/2 -translate-x-1/2 whitespace-nowrap"
                style={{ top: "240.75px" }}
              >
                {activityTitle}
              </h1>

              {/* Subtitle - Tablet */}
              <p
                className="ty-16_M text-white/90 flex items-center justify-center gap-1 absolute left-1/2 -translate-x-1/2 whitespace-nowrap"
                style={{ top: "283.5px" }}
              >
                {currentMonth}의 인기 체험 BEST
                <span aria-label="불꽃">
                  🔥
                </span>
              </p>
            </div>

            {/* Content - Mobile */}
            <div className="absolute inset-0 hidden sm-mobile:block">
              {/* Main Title - Mobile */}
              <h1
                className="ty-18_B text-white text-center absolute left-1/2 -translate-x-1/2 whitespace-nowrap"
                style={{ top: "99px" }}
              >
                {activityTitle}
              </h1>

              {/* Subtitle - Mobile */}
              <p
                className="ty-14_M text-white/90 flex items-center justify-center gap-1 absolute left-1/2 -translate-x-1/2 whitespace-nowrap"
                style={{ top: "128px" }}
              >
                {currentMonth}의 인기 체험 BEST
                <span aria-label="불꽃">
                  🔥
                </span>
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
