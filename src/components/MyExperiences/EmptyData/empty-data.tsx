import emptyDataImg from "../../../assets/atc/empty_image.svg";

const EmptyData = () => {
  return (
    <div className="flex flex-col items-center justify-start gap-[30px]">
      <img src={emptyDataImg} alt="빈 데이터" width={122} height={122} />
      <div>아직 등록한 체험이 없어요</div>
    </div>
  );
};

export default EmptyData;
