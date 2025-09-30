/**
 * ImageGallery 컴포넌트
 * 
 * 체험 이미지들을 갤러리 형식으로 표시
 * - 좌측: 배너 이미지 (595px × 534px)
 * - 우측: 서브 이미지 2×2 그리드 (각 293.5px × 263px)
 * - 이미지 간 8px 간격
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

const ImageGallery = ({ bannerImageUrl, subImages, title }: ImageGalleryProps) => {
  return (
    <div className="mt-[25px] flex gap-2 justify-center">
      {/* 좌측: 배너 이미지 */}
      <div className="max-w-[595px] h-[534px]">
        <img
          src={bannerImageUrl}
          alt={title}
          className="w-full h-full object-cover rounded-lg"
          loading="lazy"
        />
      </div>

      {/* 우측: 서브 이미지 그리드 (2x2) */}
      <div className="grid grid-cols-2 gap-2">
        {subImages.slice(0, 4).map((image, index) => (
          <div key={image.id} className="max-w-[293.5px] h-[263px]">
            <img
              src={image.imageUrl}
              alt={`${title} 이미지 ${index + 1}`}
              className="w-full h-full object-cover rounded-lg"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
