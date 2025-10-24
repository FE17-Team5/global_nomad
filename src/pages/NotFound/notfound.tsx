import { useNavigate } from "react-router-dom";
import defaultImage from "../../assets/atc/empty_image.svg";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full flex-col-center gap-2">
      <img
        src={defaultImage}
        alt="global nomad logo"
        width={120}
        height={120}
      />
      <h3 className="ty-16_M">해당하는 주소를 찾지 못했습니다.</h3>
      <button
        type="button"
        onClick={() => {
          navigate(-1);
        }}
        className="px-4 py-1 bg-primary-100 rounded-2xl cursor-pointer hover:bg-primary-500"
      >
        돌아가기
      </button>
    </div>
  );
};

export default NotFoundPage;
