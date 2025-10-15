import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import defaultProfile from "../../assets/atc/default_profile.svg";
import mobileLogo from "../../assets/atc/logo.svg";
import headerLogo from "../../assets/header-logo.svg";
import bellIcon from "../../assets/icon/icon_bell_off.svg";
import { useMyProfile } from "../../hooks/queries/useMyProfile";
import { Dropdown } from "../Dropdown";
import NotificationModal from "../Notification/notification-modal";

const Header = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 알림 모달 상태
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // 로그인 상태 확인 (팀원분 방식: localStorage)
  const authToken = localStorage.getItem("accessToken");
  const isLoggedIn = !!authToken;

  // 사용자 정보 가져오기
  const { data: userProfile } = useMyProfile(authToken);
  const profileImageUrl = userProfile?.profileImageUrl || defaultProfile;
  const nickname = userProfile?.nickname || "사용자";

  // 로그아웃 핸들러
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    // 모든 캐시 삭제 (다른 사용자 정보가 남아있지 않도록)
    queryClient.clear();
    navigate("/login");
  };

  // 드롭다운 메뉴 아이템
  const dropdownItems = [
    {
      label: "로그아웃",
      onClick: handleLogout,
    },
    {
      label: "마이 페이지",
      onClick: () => navigate("/myprofile"),
    },
  ];

  return (
    <header className="h-20 sm-mobile:h-12 bg-transparent py-[26px] sm-mobile:py-[10px] px-[30px] sm-mobile:px-6 flex justify-center">
      <div className="max-w-[1520px] w-full flex items-center justify-between">
        {/* 왼쪽: 로고 */}
        <Link
          to="/"
          className="w-[174px] sm-mobile:w-7 h-[28px] sm-mobile:h-7"
          aria-label="메인 페이지로 이동"
        >
          <img
            src={headerLogo}
            alt="GlobalNomad"
            className="w-full h-full sm-mobile:hidden"
          />
          <img
            src={mobileLogo}
            alt="GlobalNomad"
            className="hidden sm-mobile:block w-full h-full"
          />
        </Link>

        {/* 오른쪽: 로그인 상태에 따라 다른 UI */}
        {isLoggedIn ? (
          // 로그인 상태: 알림 + divider + 프로필
          <div className="flex items-center h-[30px] gap-5 relative">
            {/* 알림 종 */}
            <button
              type="button"
              className="w-6 h-6"
              aria-label="알림"
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            >
              <img src={bellIcon} alt="" className="w-full h-full" />
            </button>

            {/* 알림 모달 */}
            <NotificationModal
              isOpen={isNotificationOpen}
              onClose={() => setIsNotificationOpen(false)}
            />

            {/* Divider */}
            <div className="h-[14px] w-px border-l border-gray-100" />

            {/* 프로필 이미지 + 닉네임 (드롭다운) */}
            <Dropdown
              trigger={
                <div className="flex items-center gap-[10px] px-3 py-2 rounded-lg cursor-pointer transition duration-300 hover:bg-gray-50 hover:-translate-y-0.5">
                  <div className="w-[30px] h-[30px] rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={profileImageUrl}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="ty-14_M text-gray-950">{nickname}</span>
                </div>
              }
              items={dropdownItems}
              align="right"
            />
          </div>
        ) : (
          // 비로그인 상태: 로그인 + 회원가입 버튼
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="ty-14_M text-gray-950 cursor-pointer transition duration-300 hover:opacity-60"
            >
              로그인
            </button>
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="ty-14_M text-gray-950 cursor-pointer transition duration-300 hover:opacity-60"
            >
              회원가입
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
