import heroImage from "../../../assets/img/image2.png";

const HeroSection = () => {
  return (
    <section
      className="w-full bg-transparent"
      style={{
        paddingTop: "clamp(4.625rem, 15vw, 6.4375rem)"
      }}
    >
      <div className="flex justify-center px-[2.5rem] sm-tablet:px-[1.875rem] sm-mobile:px-6">
        <div className="w-[75rem] sm-tablet:w-[46.5rem] sm-mobile:w-[29.125rem] px-0 sm-tablet:px-0 sm-mobile:px-0">
          {/* Hero Image Container */}
          <div className="relative w-full h-[31.25rem] sm-tablet:h-[23.4375rem] sm-mobile:h-[11.3125rem] rounded-[1.5rem] sm-tablet:rounded-[1.125rem] sm-mobile:rounded-[0.75rem] overflow-hidden">
            {/* Background Image */}
            <img
              src={heroImage}
              alt=""
              role="presentation"
              className="w-full h-full object-cover"
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Content - Desktop */}
            <div className="absolute inset-0 sm-tablet:hidden sm-mobile:hidden">
              {/* Main Title - Desktop */}
              <h1 className="ty-32_B text-white text-center absolute left-1/2 -translate-x-1/2 whitespace-nowrap" style={{ top: "321px" }}>
                함께 배우고 즐기는 스트릿 댄스
              </h1>

              {/* Subtitle - Desktop */}
              <p className="ty-18_M text-white/90 flex items-center justify-center gap-1 absolute left-1/2 -translate-x-1/2 whitespace-nowrap" style={{ top: "378px" }}>
                1월의 인기 체험 BEST
                <span className="text-red-500" aria-label="하트">❤️</span>
              </p>
            </div>

            {/* Content - Tablet */}
            <div className="absolute inset-0 hidden sm-tablet:block sm-mobile:hidden">
              {/* Main Title - Tablet */}
              <h1 className="ty-24_B text-white text-center absolute left-1/2 -translate-x-1/2 whitespace-nowrap" style={{ top: "240.75px" }}>
                함께 배우고 즐기는 스트릿 댄스
              </h1>

              {/* Subtitle - Tablet */}
              <p className="ty-16_M text-white/90 flex items-center justify-center gap-1 absolute left-1/2 -translate-x-1/2 whitespace-nowrap" style={{ top: "283.5px" }}>
                1월의 인기 체험 BEST
                <span className="text-red-500" aria-label="하트">❤️</span>
              </p>
            </div>

            {/* Content - Mobile */}
            <div className="absolute inset-0 hidden sm-mobile:block">
              {/* Main Title - Mobile */}
              <h1 className="ty-18_B text-white text-center absolute left-1/2 -translate-x-1/2 whitespace-nowrap" style={{ top: "99px" }}>
                함께 배우고 즐기는 스트릿 댄스
              </h1>

              {/* Subtitle - Mobile */}
              <p className="ty-14_M text-white/90 flex items-center justify-center gap-1 absolute left-1/2 -translate-x-1/2 whitespace-nowrap" style={{ top: "128px" }}>
                1월의 인기 체험 BEST
                <span className="text-red-500" aria-label="하트">❤️</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;