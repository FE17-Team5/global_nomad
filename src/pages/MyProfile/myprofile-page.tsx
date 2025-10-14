import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import backImage from "../../assets/icon/icon_back.svg";
import CustomFileInput from "./FileInput/custom-file-input";
import MenuListComponent from "./Menu/menu-list-component";
import MenuTitleAndContent from "./Menu/menu-title-content";
import { menuComponentList } from "./Menu/profile-menu-data";

const MyProfilePage = () => {
  const location = useLocation();

  // ============ API 연동: 탭 상태 유지 (새로고침 시 탭 초기화 방지) ============
  // localStorage에서 마지막 탭 상태 불러오기
  const [selectedIndex, setSelectedIndex] = useState(() => {
    const saved = localStorage.getItem("myProfileTab");
    return saved ? Number(saved) : 0;
  });
  const [isSelected, setIsSelected] = useState(false);

  // 탭 변경 시 localStorage에 저장 (새로고침해도 마지막 탭 유지)
  useEffect(() => {
    localStorage.setItem("myProfileTab", selectedIndex.toString());
  }, [selectedIndex]);

  // 등록/수정 후 특정 탭으로 이동
  useEffect(() => {
    if (location.state?.activeTab !== undefined) {
      setSelectedIndex(location.state.activeTab);
    }
  }, [location.state]);
  // ============================================================================

  const handleClick = (id: number) => {
    setSelectedIndex(id);
    setIsSelected(!isSelected);
  };

  const handleCancel = () => {
    setIsSelected(false);
  };

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
          className="hidden absolute top-5 right-0 mobile:block bg-transparent border-none p-0 cursor-pointer"
          aria-label="뒤로가기"
        >
          <img src={backImage} alt="뒤로가기" />
        </button>
      </div>
    </div>
  );
};

export default MyProfilePage;
