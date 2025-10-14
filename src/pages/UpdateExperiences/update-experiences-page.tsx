import { useCallback, useEffect, useRef, useState } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import { useLocation, useNavigate } from "react-router-dom";
import {
  BannerImageUpload,
  CategorySelect,
  type Schedule,
  ScheduleManager,
  SubImagesUpload,
} from "../../components/AddExperiences";
import { ConfirmModal, Modal } from "../../components/Modal";
import { useUpdateMyActivity } from "../../hooks/mutations/useUpdateMyActivity";
import { useUploadActivityImage } from "../../hooks/mutations/useUploadActivityImage";
import { useActivityDetail } from "../../hooks/queries/useActivityDetail";

const CATEGORIES = ["문화 · 예술", "식음료", "스포츠", "투어", "관광", "웰빙"];

const UpdateExperiencesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // URL에서 activityId 추출
  const searchParams = new URLSearchParams(location.search);
  const activityId = Number(searchParams.get("id"));

  // 인증 토큰 가져오기
  const authToken = localStorage.getItem("accessToken");

  // 로그인 체크
  useEffect(() => {
    if (!authToken) {
      navigate("/login", { replace: true });
    }
  }, [authToken, navigate]);

  // activityId 체크
  useEffect(() => {
    if (!activityId || Number.isNaN(activityId)) {
      navigate("/myprofile", { replace: true });
    }
  }, [activityId, navigate]);

  // 기존 체험 데이터 가져오기
  const { data: activity, isLoading: isLoadingActivity } =
    useActivityDetail(activityId);

  // React Query hooks
  const uploadImageMutation = useUploadActivityImage(authToken || "");
  const updateActivityMutation = useUpdateMyActivity(
    activityId,
    authToken || "",
  );

  // 폼 입력 state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  // 원본 데이터 추적 (삭제 감지용)
  const [originalScheduleIds, setOriginalScheduleIds] = useState<number[]>([]);
  const [originalSubImageIds, setOriginalSubImageIds] = useState<number[]>([]);

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
  const [subImageIds, setSubImageIds] = useState<(number | null)[]>([]); // null은 새로 업로드한 이미지

  // 이미지 개수 동기 추적 (빠른 클릭 대응)
  const subImageCountRef = useRef(0);

  // 기존 데이터로 state 초기화
  useEffect(() => {
    if (activity) {
      setTitle(activity.title);
      setSelectedCategory(activity.category);
      setDescription(activity.description);
      setPrice(activity.price.toString());
      setAddress(activity.address);

      // 배너 이미지 설정
      setBannerImagePreview(activity.bannerImageUrl);

      // 소개 이미지 설정
      if (activity.subImages && activity.subImages.length > 0) {
        setSubImagePreviews(activity.subImages.map((img) => img.imageUrl));
        setSubImageIds(activity.subImages.map((img) => img.id));
        setOriginalSubImageIds(activity.subImages.map((img) => img.id));
        // ref도 초기화
        subImageCountRef.current = activity.subImages.length;
      }

      // 스케줄 데이터 설정 (ActivityDetail은 이미 flat 구조)
      if (activity.schedules && activity.schedules.length > 0) {
        setSchedules(activity.schedules);
        setOriginalScheduleIds(activity.schedules.map((s) => s.id));
      }
    }
  }, [activity]);

  // 모달 표시 헬퍼 함수
  const showModal = (message: string) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  // 폼 변경사항 확인 (원본 데이터와 비교)
  const hasFormChanges = useCallback(() => {
    if (!activity) return false;

    // 기본 정보 변경 확인
    const titleChanged = title.trim() !== activity.title;
    const descriptionChanged = description.trim() !== activity.description;
    const priceChanged = price.trim() !== activity.price.toString();
    const addressChanged = address.trim() !== activity.address;
    const categoryChanged = selectedCategory !== activity.category;

    // 배너 이미지 변경 확인 (새 파일 업로드)
    const bannerChanged = bannerImageFile !== null;

    // 소개 이미지 변경 확인
    const subImagesAdded = subImageFiles.length > 0;
    const subImagesRemoved =
      originalSubImageIds.length !== subImageIds.length ||
      !originalSubImageIds.every((id) => subImageIds.includes(id));

    // 스케줄 변경 확인
    const schedulesAdded = schedules.some(
      (s) => !originalScheduleIds.includes(s.id),
    );
    const schedulesRemoved = originalScheduleIds.some(
      (id) => !schedules.find((s) => s.id === id),
    );

    return (
      titleChanged ||
      descriptionChanged ||
      priceChanged ||
      addressChanged ||
      categoryChanged ||
      bannerChanged ||
      subImagesAdded ||
      subImagesRemoved ||
      schedulesAdded ||
      schedulesRemoved
    );
  }, [
    activity,
    title,
    description,
    price,
    address,
    selectedCategory,
    bannerImageFile,
    subImageFiles,
    subImageIds,
    originalSubImageIds,
    schedules,
    originalScheduleIds,
  ]);

  // 링크/버튼 클릭 감지
  useEffect(() => {
    const handleNavigationClick = (e: MouseEvent) => {
      if (!hasFormChanges()) return;

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
  }, [hasFormChanges, navigate]);

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
    setSubImageIds((prev) => [...prev, null]); // null = 새로 업로드한 이미지
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
    setSubImageIds((prev) => prev.filter((_, i) => i !== index));
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
      bannerImagePreview !== null // 기존 이미지 또는 새 이미지 필수
    );
  };

  // 수정하기 핸들러
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
      // 1. 새 배너 이미지 업로드 (변경된 경우)
      let bannerImageUrl = activity?.bannerImageUrl || "";
      if (bannerImageFile) {
        const result = await uploadImageMutation.mutateAsync(bannerImageFile);
        bannerImageUrl = result.activityImageUrl;
      }

      // 2. 새 소개 이미지 업로드
      const subImageUrlsToAdd: string[] = [];
      for (let i = 0; i < subImageFiles.length; i++) {
        const result = await uploadImageMutation.mutateAsync(subImageFiles[i]);
        subImageUrlsToAdd.push(result.activityImageUrl);
      }

      // 3. 삭제된 소개 이미지 ID 추출
      const subImageIdsToRemove = originalSubImageIds.filter(
        (id) => !subImageIds.includes(id),
      );

      // 4. 새로 추가된 스케줄과 삭제된 스케줄 분리
      const schedulesToAdd = schedules
        .filter((s) => !originalScheduleIds.includes(s.id))
        .map(({ date, startTime, endTime }) => ({
          date,
          startTime,
          endTime,
        }));

      const scheduleIdsToRemove = originalScheduleIds.filter(
        (id) => !schedules.find((s) => s.id === id),
      );

      // 5. 체험 수정 데이터 준비
      const updateData = {
        title: title.trim(),
        category: selectedCategory,
        description: description.trim(),
        address: address.trim(),
        price: Number.parseInt(price.trim(), 10),
        bannerImageUrl,
        ...(subImageUrlsToAdd.length > 0 && { subImageUrlsToAdd }),
        ...(subImageIdsToRemove.length > 0 && { subImageIdsToRemove }),
        ...(schedulesToAdd.length > 0 && { schedulesToAdd }),
        ...(scheduleIdsToRemove.length > 0 && { scheduleIdsToRemove }),
      };

      // 6. 체험 수정
      await updateActivityMutation.mutateAsync(updateData);

      // 7. 성공 모달 표시
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error("체험 수정 실패:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "체험 수정에 실패했습니다. 다시 시도해주세요.";
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

  // 로딩 중
  if (isLoadingActivity) {
    return (
      <div className="w-full flex justify-center bg-white">
        <div className="w-full max-w-[700px] px-[30px] mt-10 mb-[106px]">
          <div className="flex justify-center items-center py-20">
            <p className="ty-16_M text-gray-400">로딩 중...</p>
          </div>
        </div>
      </div>
    );
  }

  // 데이터 없음
  if (!activity) {
    return (
      <div className="w-full flex justify-center bg-white">
        <div className="w-full max-w-[700px] px-[30px] mt-10 mb-[106px]">
          <div className="flex justify-center items-center py-20">
            <p className="ty-16_M text-red-500">
              체험 정보를 불러올 수 없습니다.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center bg-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[700px] px-[30px] sm-mobile:px-6 mt-10 sm-mobile:mt-[30px] mb-[106px] sm-tablet:mb-[30px]"
        style={{ minHeight: "calc(100vh - 80px - 40px - 106px)" }}
      >
        {/* 제목 */}
        <h1 className="ty-18_B" style={{ color: "#1F1F22" }}>
          내 체험 수정
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

        {/* 수정하기 버튼 */}
        <button
          type="submit"
          disabled={
            !isFormValid() ||
            uploadImageMutation.isPending ||
            updateActivityMutation.isPending
          }
          className="mt-[24px] block mx-auto ty-14_B h-[41px] w-[120px] rounded-md transition-opacity cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
          style={{
            backgroundColor: "#3D9EF2",
            color: "#FFFFFF",
          }}
        >
          {uploadImageMutation.isPending || updateActivityMutation.isPending
            ? "수정 중..."
            : "수정하기"}
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
          // 이전 페이지로 복귀
          const returnTo = location.state?.returnTo;
          const returnActivityId = location.state?.activityId;

          if (returnTo === "detail" && returnActivityId) {
            // Detail 페이지에서 왔으면 Detail로 복귀 (데이터 갱신 요청)
            navigate(`/detail/${returnActivityId}`, {
              state: { shouldRefetch: true },
            });
          } else {
            // MyProfile에서 왔으면 MyProfile로 복귀
            navigate("/myprofile", {
              state: { shouldRefetch: true, activeTab: 2 },
            });
          }
        }}
        message="체험이 성공적으로 수정되었습니다."
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

export default UpdateExperiencesPage;
