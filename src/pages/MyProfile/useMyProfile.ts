import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

type MyProfileType = () => [
  selectedIndex: number,
  isSelected: boolean,
  setIsSelected: (isSelected: boolean) => void,
  handleClick: (id: number) => void,
  handleCancel: () => void
];

const useMyProfile: MyProfileType = () => {
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

  return [selectedIndex, isSelected, setIsSelected, handleClick, handleCancel];
};

export default useMyProfile;
