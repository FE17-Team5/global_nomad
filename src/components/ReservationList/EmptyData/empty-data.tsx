import { Link } from "react-router-dom";
import emptyDataImg from "../../../assets/atc/empty_image.svg";
import type { components } from "../../../types/api-types";

const EmptyData = ({
  selectedBadge,
}: {
  selectedBadge: components["schemas"]["ReservationStatus"] | undefined;
}) => {
  return (
    <div className="flex flex-col items-center justify-start gap-[30px]">
      <img src={emptyDataImg} alt="빈 데이터" width={122} height={122} />
      <div>
        {selectedBadge ? `데이터가 없습니다!` : "아직 예약한 체험이 없어요."}
      </div>
      <Link
        to={"/"}
        className="px-[40px] py-3.5 rounded-2xl ty-16_B text-white cursor-pointer bg-primary-500"
      >
        둘러보기
      </Link>
    </div>
  );
};

export default EmptyData;
