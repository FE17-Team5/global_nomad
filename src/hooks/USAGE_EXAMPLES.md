# React Query 커스텀 훅 사용 가이드

## 📦 설치 완료된 것들

1. ✅ QueryClientProvider 설정 (main.tsx)
2. ✅ useQuery 커스텀 훅 (queries 폴더)
3. ✅ useMutation 커스텀 훅 (mutations 폴더)

---

## 🔍 useQuery 훅 사용법 (데이터 조회)

### 1. 체험 상세 정보 조회

```tsx
import { useActivityDetail } from '@/hooks/queries';

function DetailPage() {
  const { id } = useParams();
  const { data, isLoading, error } = useActivityDetail(Number(id));

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생</div>;
  
  return <div>{data.title}</div>;
}
```

### 2. 체험 목록 조회 (필터링)

```tsx
import { useActivitiesList } from '@/hooks/queries';

function MainPage() {
  const { data, isLoading } = useActivitiesList({
    method: 'offset',
    page: 1,
    size: 10,
    category: '투어',
    sort: 'latest',
  });

  return (
    <div>
      {data?.activities.map(activity => (
        <ActivityCard key={activity.id} {...activity} />
      ))}
    </div>
  );
}
```

### 3. 내 프로필 조회 (인증 필요)

```tsx
import { useMyProfile } from '@/hooks/queries';

function MyProfilePage() {
  const authToken = localStorage.getItem('accessToken');
  const { data: profile } = useMyProfile(authToken);

  return <div>{profile?.nickname}</div>;
}
```

### 4. 체험 리뷰 조회

```tsx
import { useActivityReviews } from '@/hooks/queries';

function ReviewSection({ activityId }: { activityId: number }) {
  const { data } = useActivityReviews(activityId, { page: 1, size: 5 });

  return (
    <div>
      <h3>평균 평점: {data?.averageRating}</h3>
      {data?.reviews.map(review => (
        <ReviewItem key={review.id} {...review} />
      ))}
    </div>
  );
}
```

---

## ✏️ useMutation 훅 사용법 (데이터 변경)

### 1. 로그인

```tsx
import { useLogin } from '@/hooks/mutations';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const login = useLogin();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    try {
      const result = await login.mutateAsync({
        email: 'test@example.com',
        password: 'password123',
      });
      
      // 토큰 저장
      localStorage.setItem('accessToken', result.accessToken);
      localStorage.setItem('refreshToken', result.refreshToken);
      
      navigate('/');
    } catch (error) {
      alert('로그인 실패');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* ... */}
      <button type="submit" disabled={login.isPending}>
        {login.isPending ? '로그인 중...' : '로그인'}
      </button>
    </form>
  );
}
```

### 2. 예약 생성

```tsx
import { useCreateReservation } from '@/hooks/mutations';

function ReservationButton({ activityId }: { activityId: number }) {
  const authToken = localStorage.getItem('accessToken')!;
  const createReservation = useCreateReservation(activityId, authToken);

  const handleReserve = () => {
    createReservation.mutate(
      {
        scheduleId: 123,
        headCount: 2,
      },
      {
        onSuccess: (data) => {
          alert('예약 성공!');
          console.log('예약 ID:', data.id);
        },
        onError: (error) => {
          alert('예약 실패');
        },
      }
    );
  };

  return (
    <button onClick={handleReserve} disabled={createReservation.isPending}>
      {createReservation.isPending ? '예약 중...' : '예약하기'}
    </button>
  );
}
```

### 3. 내 체험 삭제

```tsx
import { useDeleteMyActivity } from '@/hooks/mutations';
import { useNavigate } from 'react-router-dom';

function DeleteButton({ activityId }: { activityId: number }) {
  const navigate = useNavigate();
  const authToken = localStorage.getItem('accessToken')!;
  const deleteActivity = useDeleteMyActivity(authToken);

  const handleDelete = () => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    deleteActivity.mutate(activityId, {
      onSuccess: () => {
        alert('삭제되었습니다');
        navigate('/myprofile');
      },
    });
  };

  return <button onClick={handleDelete}>삭제</button>;
}
```

### 4. 리뷰 작성

```tsx
import { useCreateReservationReview } from '@/hooks/mutations';

function ReviewForm({ reservationId, activityId }: Props) {
  const authToken = localStorage.getItem('accessToken')!;
  const createReview = useCreateReservationReview(
    reservationId,
    activityId,
    authToken
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    createReview.mutate(
      {
        rating: 5,
        content: '정말 좋았어요!',
      },
      {
        onSuccess: () => {
          alert('리뷰가 작성되었습니다');
        },
      }
    );
  };

  return <form onSubmit={handleSubmit}>{/* ... */}</form>;
}
```

---

## 📚 전체 훅 목록

### Queries (조회)
- `useActivitiesList` - 체험 목록
- `useActivityDetail` - 체험 상세
- `useAvailableSchedule` - 예약 가능일
- `useActivityReviews` - 체험 리뷰
- `useMyProfile` - 내 프로필
- `useMyActivitiesList` - 내 체험 목록
- `useReservationDashboard` - 예약 대시보드
- `useReservedSchedule` - 날짜별 예약 현황
- `useActivityReservations` - 시간대별 예약 내역
- `useMyReservationsList` - 내 예약 목록
- `useMyNotificationsList` - 내 알림 목록

### Mutations (변경)
- `useLogin` - 로그인
- `useSignUp` - 회원가입
- `useUpdateMyProfile` - 프로필 수정
- `useUploadProfileImage` - 프로필 이미지 업로드
- `useCreateActivity` - 체험 등록
- `useCreateReservation` - 예약 생성
- `useUploadActivityImage` - 체험 이미지 업로드
- `useUpdateMyActivity` - 체험 수정
- `useDeleteMyActivity` - 체험 삭제
- `useUpdateReservationStatus` - 예약 상태 변경
- `useCancelMyReservation` - 예약 취소
- `useCreateReservationReview` - 리뷰 작성
- `useDeleteMyNotification` - 알림 삭제

---

## 💡 주요 특징

1. **자동 캐싱** - 같은 데이터를 여러 번 요청해도 한 번만 fetch
2. **자동 갱신** - mutation 성공 시 관련 query 자동 invalidate
3. **로딩 상태** - `isLoading`, `isPending` 자동 관리
4. **에러 처리** - `error` 객체 자동 제공
5. **Optimistic Update** 가능 - 필요시 추가 구현
6. **DevTools** - 개발 환경에서 쿼리 상태 시각화

---

## 🔧 인증 토큰 관리 팁

```tsx
// 토큰을 커스텀 훅으로 관리하면 편리함
function useAuth() {
  const [token, setToken] = useState(localStorage.getItem('accessToken'));
  
  return { token, setToken };
}

// 사용
function MyComponent() {
  const { token } = useAuth();
  const { data } = useMyProfile(token);
  // ...
}
```

