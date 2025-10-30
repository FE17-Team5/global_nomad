import { Link } from "react-router-dom";
import { profileMenuDataList } from "./profile-menu-data";

const MenuTitleAndContent = ({ index }: { index: number }) => {
  const menu = profileMenuDataList[index];

  return (
    <div className="flex items-center justify-between mobile:flex-col mobile:gap-2 mobile:items-start">
      <div className="flex flex-col py-2.5 gap-1">
        <h3 className="ty-18_B text-gray-950">{menu.title}</h3>
        <h3 className="ty-14_M text-gray-500">{menu.content}</h3>
      </div>
      {menu.id === 2 && (
        <Link
          to={"add"}
          className="w-[138px] h-[48px] px-6 py-3.5 rounded-[14px] ty-16_B bg-primary-500 text-white cursor-pointer
          transition transform duration-200 hover:scale-105 hover:shadow-md"
        >
          체험 등록하기
        </Link>
      )}
    </div>
  );
};

export default MenuTitleAndContent;
