import { useCallback, useEffect, useRef, useState } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import { useNavigate } from "react-router-dom";
import {
  BannerImageUpload,
  CategorySelect,
  type Schedule,
  ScheduleManager,
  SubImagesUpload,
} from "../../components/AddExperiences";
import { ConfirmModal, Modal } from "../../components/Modal";
import { useCreateActivity } from "../../hooks/mutations/useCreateActivity";
import { useUploadActivityImage } from "../../hooks/mutations/useUploadActivityImage";

const CATEGORIES = ["문화 · 예술", "식음료", "스포츠", "투어", "관광", "웰빙"];

const AddExperiencesPage = () => {
  const navigate = useNavigate();

  // 인증 토큰 가져오기
  const authToken = localStorage.getItem("accessToken");

  // 로그인 체크
  useEffect(() => {
    if (!authToken) {
      navigate("/login", { replace: true });
    }
  }, [authToken, navigate]);

  // React Query hooks
  const uploadImageMutation = useUploadActivityImage(authToken || "");
  const createActivityMutation = useCreateActivity(authToken || "");

  // 폼 입력 state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  // 모달 관련 state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
  const [blockedNavigation, setBlockedNavigation] = useState<
    (() => void) | null
  >(null);

  // 이미지 관련 state
  const [bannerImagePreview, setBannerImagePreview] = useState<string | null>(
    null,
  );
  const [bannerImageFile, setBannerImageFile] = useState<File | null>(null);
  const [subImagePreviews, setSubImagePreviews] = useState<string[]>([]);
  const [subImageFiles, setSubImageFiles] = useState<File[]>([]);

  // 이미지 개수 동기 추적 (빠른 클릭 대응)
  const subImageCountRef = useRef(0);

  // 모달 표시 헬퍼 함수
  const showModal = (message: string) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  // 폼 입력 여부 확인
  const hasFormData = useCallback(() => {
    return (
      title.trim() !== "" ||
      description.trim() !== "" ||
      price.trim() !== "" ||
      address.trim() !== "" ||
      selectedCategory !== "" ||
      schedules.length > 0 ||
      bannerImageFile !== null ||
      subImageFiles.length > 0
    );
  }, [
    title,
    description,
    price,
    address,
    selectedCategory,
    schedules,
    bannerImageFile,
    subImageFiles,
  ]);

  // 링크/버튼 클릭 감지
  useEffect(() => {
    const handleNavigationClick = (e: MouseEvent) => {
      if (!hasFormData()) return;

      const target = e.target as HTMLElement;

      // 1. <a> 태그 (Link) 감지
      const link = target.closest("a");
      if (link) {
        const href = link.getAttribute("href");
        if (href?.startsWith("/")) {
          e.preventDefault();
          e.stopPropagation();
          setBlockedNavigation(() => () => navigate(href));
          setIsExitModalOpen(true);
          return;
        }
      }

      // 2. 헤더 드롭다운 버튼 감지
      const button = target.closest("button");
      if (button && button.getAttribute("role") === "menuitem") {
        const buttonText = button.textContent?.trim();
        if (buttonText === "마이 페이지") {
          e.preventDefault();
          e.stopPropagation();
          setBlockedNavigation(() => () => navigate("/myprofile"));
          setIsExitModalOpen(true);
        }
      }
    };

    document.addEventListener("click", handleNavigationClick, true);
    return () => {
      document.removeEventListener("click", handleNavigationClick, true);
    };
  }, [hasFormData, navigate]);

  // 배너 이미지 핸들러
  const handleBannerUpload = (file: File) => {
    setBannerImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setBannerImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleBannerRemove = () => {
    setBannerImagePreview(null);
    setBannerImageFile(null);
  };

  // 주소 검색 핸들러
  const handleAddressComplete = (data: {
    address: string;
    addressType: string;
    bname: string;
    buildingName: string;
  }) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setAddress(fullAddress);
    setIsPostcodeOpen(false);
  };

  // 소개 이미지 핸들러
  const handleSubImageUpload = (file: File) => {
    // 동기적 체크 (빠른 클릭에도 안전)
    if (subImageCountRef.current >= 4) {
      showModal("소개 이미지는 최대 4개까지 등록할 수 있습니다.");
      return;
    }

    // 즉시 카운트 증가
    subImageCountRef.current += 1;

    setSubImageFiles((prev) => [...prev, file]);
    const reader = new FileReader();
    reader.onloadend = () => {
      setSubImagePreviews((prev) => [...prev, reader.result as string]);
    };
    reader.readAsDataURL(file);
  };

  const handleSubImageRemove = (index: number) => {
    // 즉시 카운트 감소
    subImageCountRef.current -= 1;

    setSubImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setSubImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // 필수 필드 검증
  const isFormValid = () => {
    return (
      title.trim() !== "" &&
      selectedCategory !== "" &&
      description.trim() !== "" &&
      price.trim() !== "" &&
      address.trim() !== "" &&
      schedules.length > 0 &&
      bannerImageFile !== null
    );
  };

  // 등록하기 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!authToken) {
      showModal("로그인이 필요합니다.");
      setTimeout(() => navigate("/login"), 1500);
      return;
    }

    if (!isFormValid()) {
      showModal("필수 항목을 모두 입력해주세요.");
      return;
    }

    try {
      // 1. 배너 이미지 업로드
      const bannerImageUrl = await uploadImageMutation.mutateAsync(
        bannerImageFile!,
      );

      // 2. 소개 이미지 업로드
      const subImageUrls: string[] = [];
      for (const file of subImageFiles) {
        const result = await uploadImageMutation.mutateAsync(file);
        subImageUrls.push(result.activityImageUrl);
      }

      // 3. 체험 등록 데이터 준비
      const activityData = {
        title: title.trim(),
        category: selectedCategory,
        description: description.trim(),
        address: address.trim(),
        price: Number.parseInt(price.trim(), 10),
        schedules: schedules.map(({ date, startTime, endTime }) => ({
          date,
          startTime,
          endTime,
        })),
        bannerImageUrl: bannerImageUrl.activityImageUrl,
        subImageUrls: subImageUrls.length > 0 ? subImageUrls : undefined,
      };

      // 4. 체험 등록
      await createActivityMutation.mutateAsync(activityData);

      // 5. 성공 모달 표시
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error("체험 등록 실패:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "체험 등록에 실패했습니다. 다시 시도해주세요.";
      showModal(errorMessage);
    }
  };

  // 이탈 모달 핸들러
  const handleConfirmExit = () => {
    setIsExitModalOpen(false);
    if (blockedNavigation) {
      blockedNavigation();
    }
  };

  const handleCancelExit = () => {
    setIsExitModalOpen(false);
    setBlockedNavigation(null);
  };

  return (
    <div className="w-full flex justify-center bg-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[700px] px-[30px] sm-mobile:px-6 mt-10 sm-mobile:mt-[30px] mb-[106px] sm-tablet:mb-[30px]"
        style={{ minHeight: "calc(100vh - 80px - 40px - 106px)" }}
      >
        {/* 제목 */}
        <h1 className="ty-18_B" style={{ color: "#1F1F22" }}>
          내 체험 등록
        </h1>

        {/* 제목 입력 */}
        <div className="mt-6">
          <label
            htmlFor="title"
            className="ty-16_B block"
            style={{ color: "#1F1F22" }}
          >
            제목
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력해 주세요"
            className="w-full h-[54px] mt-[10px] px-5 rounded-md ty-16_M placeholder:text-[#9FA0A7]"
            style={{
              color: "#1F1F22",
              border: "1px solid #E0E0E5",
              boxShadow: "0px 2px 6px 0px #00000005",
            }}
          />
        </div>

        {/* 카테고리 선택 */}
        <CategorySelect
          value={selectedCategory}
          onChange={setSelectedCategory}
          categories={CATEGORIES}
        />

        {/* 설명 입력 */}
        <div className="mt-6">
          <label
            htmlFor="description"
            className="ty-16_B block"
            style={{ color: "#1F1F22" }}
          >
            설명
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="체험에 대한 설명을 입력해 주세요"
            className="w-full h-[200px] mt-[10px] px-5 pt-4 pb-3 rounded-md ty-16_M placeholder:text-[#9FA0A7] resize-none"
            style={{
              color: "#1F1F22",
              border: "1px solid #E0E0E5",
              boxShadow: "0px 2px 6px 0px #00000005",
            }}
          />
        </div>

        {/* 가격 입력 */}
        <div className="mt-6">
          <label
            htmlFor="price"
            className="ty-16_B block"
            style={{ color: "#1F1F22" }}
          >
            가격
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="체험 금액을 입력해 주세요"
            step="10000"
            min="0"
            className="w-full h-[54px] mt-[10px] px-5 rounded-md ty-16_M placeholder:text-[#9FA0A7]"
            style={{
              color: "#1F1F22",
              border: "1px solid #E0E0E5",
              boxShadow: "0px 2px 6px 0px #00000005",
            }}
          />
        </div>

        {/* 주소 입력 */}
        <div className="mt-6">
          <label
            htmlFor="address"
            className="ty-16_B block"
            style={{ color: "#1F1F22" }}
          >
            주소
          </label>
          <input
            type="text"
            id="address"
            value={address}
            onClick={() => setIsPostcodeOpen(true)}
            readOnly
            placeholder="주소를 검색해 주세요"
            className="w-full h-[54px] mt-[10px] px-5 rounded-md ty-16_M placeholder:text-[#9FA0A7] cursor-pointer"
            style={{
              color: "#1F1F22",
              border: "1px solid #E0E0E5",
              boxShadow: "0px 2px 6px 0px #00000005",
            }}
          />
        </div>

        {/* 예약 가능한 시간대 */}
        <ScheduleManager
          schedules={schedules}
          onSchedulesChange={setSchedules}
          onShowModal={showModal}
        />

        {/* 배너 이미지 등록 */}
        <BannerImageUpload
          preview={bannerImagePreview}
          onUpload={handleBannerUpload}
          onRemove={handleBannerRemove}
        />

        {/* 소개 이미지 등록 */}
        <SubImagesUpload
          previews={subImagePreviews}
          onUpload={handleSubImageUpload}
          onRemove={handleSubImageRemove}
        />

        {/* 등록하기 버튼 */}
        <button
          type="submit"
          disabled={
            !isFormValid() ||
            uploadImageMutation.isPending ||
            createActivityMutation.isPending
          }
          className="mt-[24px] block mx-auto ty-14_B h-[41px] w-[120px] rounded-md transition-opacity cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
          style={{
            backgroundColor: "#3D9EF2",
            color: "#FFFFFF",
          }}
        >
          {uploadImageMutation.isPending || createActivityMutation.isPending
            ? "등록 중..."
            : "등록하기"}
        </button>
      </form>

      {/* 에러/경고 모달 */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={modalMessage}
      />

      {/* 성공 모달 */}
      <Modal
        isOpen={isSuccessModalOpen}
        onClose={() => {
          setIsSuccessModalOpen(false);
          navigate("/myprofile", {
            state: { shouldRefetch: true, activeTab: 2 },
          });
        }}
        message="체험이 성공적으로 등록되었습니다."
      />

      {/* 이탈 확인 모달 */}
      <ConfirmModal
        isOpen={isExitModalOpen}
        onClose={handleCancelExit}
        onConfirm={handleConfirmExit}
        message={`저장되지 않았습니다.\n정말 괜찮으시겠습니까?`}
        confirmText="네"
      />

      {/* 우편번호 검색 모달 */}
      {isPostcodeOpen && (
        <button
          type="button"
          className="fixed inset-0 z-50 flex items-center justify-center px-6"
          style={{
            backgroundColor: "#00000080",
            border: "none",
            padding: "24px",
            cursor: "default",
          }}
          onClick={() => setIsPostcodeOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setIsPostcodeOpen(false);
            }
          }}
          aria-label="우편번호 검색 모달"
        >
          <button
            type="button"
            className="bg-white rounded-xl p-6 w-full max-w-[500px]"
            style={{ border: "none", cursor: "default" }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="ty-18_B text-gray-950">주소 검색</h3>
              <button
                type="button"
                onClick={() => setIsPostcodeOpen(false)}
                className="ty-14_M text-gray-600 cursor-pointer hover:text-gray-950"
              >
                닫기
              </button>
            </div>
            <DaumPostcodeEmbed
              onComplete={handleAddressComplete}
              autoClose={false}
            />
          </button>
        </button>
      )}
    </div>
  );
};

export default AddExperiencesPage;
