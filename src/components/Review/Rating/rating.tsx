import starOnImg from "../../../assets/icon/icon_star_on.svg";
import starOffImg from "../../../assets/icon/icon_star_off.svg";
const starArray = [1, 2, 3, 4, 5];

const Rating = ({
  displayRating,
  onRatingClick,
  onMouseEnter,
  onMouseLeave,
}: {
  displayRating: number;
  onRatingClick: (star: number) => void;
  onMouseEnter: (star: number) => void;
  onMouseLeave: () => void;
}) => {
  return (
    <div className="flex gap-3" onMouseLeave={onMouseLeave}>
      {starArray.map((star, index) => (
        <img
          key={index}
          src={star <= displayRating ? starOnImg : starOffImg}
          alt={`${star}점 별점`}
          width={42}
          height={42}
          className="cursor-pointer"
          onClick={() => onRatingClick(star)}
          onMouseEnter={() => onMouseEnter(star)}
        />
      ))}
    </div>
  );
};

export default Rating;
