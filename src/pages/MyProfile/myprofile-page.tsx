import backImage from "../../assets/icon/icon_back.svg";
import CustomFileInput from "./FileInput/custom-file-input";
import MenuListComponent from "./Menu/menu-list-component";
import MenuTitleAndContent from "./Menu/menu-title-content";
import { menuComponentList } from "./Menu/profile-menu-data";
import useMyProfile from "./useMyProfile";

const MyProfilePage = () => {
  const [selectedIndex, isSelected, setIsSelected, handleClick, handleCancel] =
    useMyProfile();

  return (
    <div className="flex my-10 gap-[50px] items-start justify-center tablet:gap-[30px] tablet:px-[30px] mobile:px-6">
      <div
        className={`grow max-w-[290px] px-3.5 py-6 flex flex-col gap-6 
        border border-gray-50 rounded-xl shadow-[0_4px_24px_0_#9CB4CA33]
        tablet:max-w-[178px] tablet:gap-3 mobile:max-w-[327px] mobile:gap-6 ${
          isSelected && "mobile:hidden"
        }`}
      >
        <CustomFileInput />
        <MenuListComponent
          selectedIndex={selectedIndex}
          onClick={handleClick}
        />
      </div>
      <div
        className={`grow max-w-[640px] flex flex-col ${
          selectedIndex === 1 ? "gap-3.5" : "gap-6"
        } relative tablet:max-w-[478px] ${!isSelected && "mobile:hidden"}`}
      >
        <MenuTitleAndContent index={selectedIndex} />
        {menuComponentList(selectedIndex, handleCancel)}
        <button
          type="button"
          onClick={() => setIsSelected(!isSelected)}
          className="hidden absolute top-5 right-0 mobile:block bg-transparent border-none p-1 cursor-pointer 
          transition transform duration-200 hover:scale-105 hover:shadow-md rounded-full"
          aria-label="뒤로가기"
        >
          <img src={backImage} alt="뒤로가기" />
        </button>
      </div>
    </div>
  );
};

export default MyProfilePage;
