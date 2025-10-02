import facebookIcon from "../../assets/icon/icon_facebook.svg";
import instagramIcon from "../../assets/icon/icon_instagram.svg";
import youtubeIcon from "../../assets/icon/icon_youtube.svg";
import xIcon from "../../assets/icon/icon_X.svg";

const Footer = () => {
  return (
    <footer
      className="h-[140px] sm-mobile:h-[116px] border-t border-gray-100 bg-white flex items-center sm-mobile:items-start justify-center px-[30px] sm-mobile:px-6"
      role="contentinfo"
    >
      {/* PC & 태블릿: 가로 레이아웃 (375px 초과) */}
      <div className="sm-mobile:hidden max-w-[1520px] w-full flex items-center justify-between">
        {/* 최좌측: Copyright */}
        <div className="ty-13_M text-gray-400">
          ©codeit - 2023
        </div>

        {/* 중앙: Privacy & FAQ */}
        <div className="ty-13_M text-gray-600 flex items-center gap-6">
          <span>Privacy Policy</span>
          <span>∙</span>
          <span>FAQ</span>
        </div>

        {/* 최우측: SNS 링크 */}
        <nav aria-label="소셜 미디어 링크">
          <div className="flex items-center gap-4">
            <a 
              href="https://www.facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-5 h-5 transition-transform duration-300 hover:scale-110 hover:brightness-75"
              aria-label="Facebook 페이지"
            >
              <img src={facebookIcon} alt="" role="presentation" className="w-full h-full" />
            </a>
            <a 
              href="https://www.instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-5 h-5 transition-transform duration-300 hover:scale-110 hover:brightness-75"
              aria-label="Instagram 페이지"
            >
              <img src={instagramIcon} alt="" role="presentation" className="w-full h-full" />
            </a>
            <a 
              href="https://www.youtube.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-5 h-5 transition-transform duration-300 hover:scale-110 hover:brightness-75"
              aria-label="YouTube 채널"
            >
              <img src={youtubeIcon} alt="" role="presentation" className="w-full h-full" />
            </a>
            <a 
              href="https://www.x.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-5 h-5 transition-transform duration-300 hover:scale-110 hover:brightness-75"
              aria-label="X (트위터) 페이지"
            >
              <img src={xIcon} alt="" role="presentation" className="w-full h-full" />
            </a>
          </div>
        </nav>
      </div>

      {/* 모바일: 세로 레이아웃 (375px 이하) */}
      <div className="hidden sm-mobile:flex w-full flex-col items-center pt-[30px] pb-[30px]">
        {/* 최상단: Privacy & FAQ (중앙 정렬) */}
        <div className="ty-13_M text-gray-600 flex items-center gap-6">
          <span>Privacy Policy</span>
          <span>∙</span>
          <span>FAQ</span>
        </div>

        {/* 간격: 20px */}
        <div className="h-5" />

        {/* 하단: Copyright (좌측) + SNS 링크 (우측) */}
        <div className="w-full flex items-center justify-between">
          {/* 좌측: Copyright */}
          <div className="ty-13_M text-gray-400">
            ©codeit - 2023
          </div>

          {/* 우측: SNS 링크 */}
          <nav aria-label="소셜 미디어 링크">
            <div className="flex items-center gap-4">
              <a 
                href="https://www.facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-5 h-5 transition-transform duration-300 hover:scale-110 hover:brightness-75"
                aria-label="Facebook 페이지"
              >
                <img src={facebookIcon} alt="" role="presentation" className="w-full h-full" />
              </a>
              <a 
                href="https://www.instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-5 h-5 transition-transform duration-300 hover:scale-110 hover:brightness-75"
                aria-label="Instagram 페이지"
              >
                <img src={instagramIcon} alt="" role="presentation" className="w-full h-full" />
              </a>
              <a 
                href="https://www.youtube.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-5 h-5 transition-transform duration-300 hover:scale-110 hover:brightness-75"
                aria-label="YouTube 채널"
              >
                <img src={youtubeIcon} alt="" role="presentation" className="w-full h-full" />
              </a>
              <a 
                href="https://www.x.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-5 h-5 transition-transform duration-300 hover:scale-110 hover:brightness-75"
                aria-label="X (트위터) 페이지"
              >
                <img src={xIcon} alt="" role="presentation" className="w-full h-full" />
              </a>
            </div>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
