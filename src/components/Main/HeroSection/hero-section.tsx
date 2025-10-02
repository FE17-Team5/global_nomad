import heroImage from "../../../assets/img/image2.png";

const HeroSection = () => {
  return (
    <section className="w-full bg-white py-[2rem] tablet:py-[1.5rem] mobile:py-[1rem]">
      <div className="flex justify-center px-[2.5rem] tablet:px-6 mobile:px-6">
        <div className="w-[75rem] tablet:w-[46.5rem] mobile:w-[29.125rem]">
          {/* Hero Image Container */}
          <div className="relative w-full h-[20rem] tablet:h-[16rem] mobile:h-[12rem] rounded-[1.5rem] tablet:rounded-[1.125rem] mobile:rounded-[0.75rem] overflow-hidden">
            {/* Background Image */}
            <img
              src={heroImage}
              alt=""
              role="presentation"
              className="w-full h-full object-cover"
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              {/* Main Title */}
              <h1 className="ty-24_B tablet:ty-20_B mobile:ty-18_B text-white mb-2">
                함께 배우고 즐기는 스트릿 댄스
              </h1>

              {/* Subtitle */}
              <p className="ty-14_M tablet:ty-13_M mobile:ty-12_M text-white/90 flex items-center justify-center gap-1">
                1명의 인기 체험 BEST
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