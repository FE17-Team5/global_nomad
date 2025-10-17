import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import defaultProfile from "../../assets/atc/default_profile.svg";
import mobileLogo from "../../assets/atc/logo.svg";
import headerLogo from "../../assets/header-logo.svg";
import bellIconOff from "../../assets/icon/icon_bell_off.svg";
import bellIconOn from "../../assets/icon/icon_bell_on.svg";
import { useMyProfile } from "../../hooks/queries/useMyProfile";
import { useMyNotificationsList } from "../../hooks/queries/useMyNotificationsList";
import { Dropdown } from "../Dropdown";
/**
 * 헤더 컴포넌트
 *
 * 전역 네비게이션 헤더
 * - 로고 및 홈 링크
 * - 로그인/회원가입 버튼 (비로그인 상태)
 * - 사용자 메뉴 (로그인 상태):
 *   - 알림 (NotificationModal)
 *   - 프로필 이미지 및 닉네임
 *   - 드롭다운 메뉴 (로그아웃, 마이 페이지)
 * - 반응형: 데스크탑, 모바일 별도 로고
 */

import NotificationModal from "../Notification/notification-modal";

const Header = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 알림 모달 상태
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // 로그인 상태 확인 (localStorage에서 accessToken 확인)
  const authToken = localStorage.getItem("accessToken");
  const isLoggedIn = !!authToken;

  // 사용자 프로필 정보 가져오기
  const { data: userProfile } = useMyProfile(authToken);
  const profileImageUrl = userProfile?.profileImageUrl || defaultProfile;
  const nickname = userProfile?.nickname || "사용자";

  // 알림 목록 가져오기 (알림 개수 확인용)
  const { data: notificationsResponse } = useMyNotificationsList(
    { size: 10 },
    authToken
  );
  const hasNotifications = (notificationsResponse?.totalCount || 0) > 0;

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
            <div className="relative">
              <button
                type="button"
                className="cursor-pointer transition duration-300 hover:-translate-y-0.5"
                aria-label="알림"
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              >
                <img
                  src={hasNotifications ? bellIconOn : bellIconOff}
                  alt=""
                  className="w-6 h-6"
                  style={{
                    filter: isNotificationOpen
                      ? "brightness(0) saturate(100%) invert(47%) sepia(96%) saturate(2488%) hue-rotate(197deg) brightness(98%) contrast(93%)"
                      : "none",
                  }}
                />
              </button>

              {/* 알림 모달 - 벨 아이콘 바로 아래 */}
              <NotificationModal
                isOpen={isNotificationOpen}
                onClose={() => setIsNotificationOpen(false)}
              />
            </div>

            {/* Divider - 벨 아이콘과 프로필 사이 */}
            <div className="h-[14px] w-px bg-gray-300" />

            {/* 프로필 이미지 + 닉네임 (드롭다운) */}
            <Dropdown
              trigger={
                <div className="flex items-center gap-[10px] cursor-pointer transition duration-300 hover:-translate-y-0.5">
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
