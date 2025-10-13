/**
 * ImageGallery 컴포넌트
 *
 * 체험 이미지들을 갤러리 형식으로 표시
 * - 좌측: 배너 이미지 (329px × 400px)
 * - 우측: 서브 이미지 2×2 그리드 (각 158.5px × 194px)
 * - 이미지 간 12px 간격
 * - lazy loading 적용 (성능 최적화)
 */

interface SubImage {
  id: number;
  imageUrl: string;
}

interface ImageGalleryProps {
  bannerImageUrl: string;
  subImages: SubImage[];
  title: string;
}

const ImageGallery = ({
  bannerImageUrl,
  subImages,
  title,
}: ImageGalleryProps) => {
  const subImageCount = subImages.length;

  // 서브 이미지가 없으면 배너만 전체 너비로 표시
  if (subImageCount === 0) {
    return (
      <div className="w-full h-[400px] rounded-3xl overflow-hidden">
        <img
          src={bannerImageUrl}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    );
  }

  // 서브 이미지가 1개면 배너 + 서브 1개 (각각 400px 전체 높이)
  if (subImageCount === 1) {
    return (
      <div className="flex gap-3 overflow-hidden rounded-3xl">
        {/* 좌측: 배너 이미지 */}
        <div className="max-w-[329px] h-[400px] sm-mobile:max-w-full">
          <img
            src={bannerImageUrl}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* 우측: 서브 이미지 1개 (전체 높이) - 375px 이하에서 숨김 */}
        <div className="max-w-[329px] h-[400px] sm-mobile:hidden">
          <img
            src={subImages[0].imageUrl}
            alt={`${title} 이미지 1`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    );
  }

  // 서브 이미지가 2개면 배너 + 서브 2개 (세로 배치)
  if (subImageCount === 2) {
    return (
      <div className="flex gap-3 overflow-hidden rounded-3xl">
        {/* 좌측: 배너 이미지 */}
        <div className="max-w-[329px] h-[400px] sm-mobile:max-w-full">
          <img
            src={bannerImageUrl}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* 우측: 서브 이미지 2개 (세로 배치) - 375px 이하에서 숨김 */}
        <div className="max-w-[329px] flex flex-col gap-3 sm-mobile:hidden">
          <div className="w-full h-[194px]">
            <img
              src={subImages[0].imageUrl}
              alt={`${title} 이미지 1`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="w-full h-[194px]">
            <img
              src={subImages[1].imageUrl}
              alt={`${title} 이미지 2`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    );
  }

  // 서브 이미지가 3개면 배너 + 특수 레이아웃 (위 2개 + 아래 1개 전체)
  if (subImageCount === 3) {
    return (
      <div className="flex gap-3 overflow-hidden rounded-3xl">
        {/* 좌측: 배너 이미지 */}
        <div className="max-w-[329px] h-[400px] sm-mobile:max-w-full">
          <img
            src={bannerImageUrl}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* 우측: 서브 이미지 (위 2개 + 아래 1개) - 375px 이하에서 숨김 */}
        <div className="max-w-[329px] flex flex-col gap-3 sm-mobile:hidden">
          {/* 위: 2개 가로 배치 */}
          <div className="flex gap-3">
            <div className="w-[158.5px] h-[194px]">
              <img
                src={subImages[0].imageUrl}
                alt={`${title} 이미지 1`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="w-[158.5px] h-[194px]">
              <img
                src={subImages[1].imageUrl}
                alt={`${title} 이미지 2`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* 아래: 1개 전체 너비 */}
          <div className="w-full h-[194px]">
            <img
              src={subImages[2].imageUrl}
              alt={`${title} 이미지 3`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    );
  }

  // 서브 이미지가 4개 이상이면 배너 + 그리드 (2×2)
  return (
    <div className="flex gap-3 overflow-hidden rounded-3xl">
      {/* 좌측: 배너 이미지 */}
      <div className="max-w-[329px] h-[400px] sm-mobile:max-w-full">
        <img
          src={bannerImageUrl}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* 우측: 서브 이미지 그리드 (2×2) - 375px 이하에서 숨김 */}
      <div className="max-w-[329px] grid grid-cols-2 gap-3 sm-mobile:hidden">
        {subImages.slice(0, 4).map((image, index) => (
          <div key={image.id} className="w-full h-[194px]">
            <img
              src={image.imageUrl}
              alt={`${title} 이미지 ${index + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
