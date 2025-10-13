// mockActivityDetail.ts
export const mockActivityDetail = {
  id: 7,
  category: "투어",
  title: "함께 배우면 즐거운 스트릿댄스",
  description:
    "안녕하세요! 저희 스트릿 댄스 체험을 소개합니다. 저희는 신나고 재미있는 스트릿 댄스 스타일을 가르칩니다. 크럼프는 세계적으로 인기 있는 댄스 스타일로, 어디서든 춤출 수 있습니다. 저희 체험에서는 새로운 스타일을 접할 수 있고, 즐거운 시간을 보낼 수 있습니다. 저희는 초보자부터 전문가까지 어떤 수준의 춤추는 사람도 가르칠 수 있도록 준비해놓았습니다. 저희와 함께 즐길 수 있는 시간을 기대해주세요! 각종 음악에 적합한 스타일로, 저희는 크럼프 외에도 전통적인 스트릿 댄스 스타일과 최신 스트릿 댄스 스타일까지 가르칠 수 있습니다. 저희 체험에서는 전문가가 직접 강사로 참여하기 때문에, 저희가 제공하는 코스는 어떤 수준의 춤추는 사람도 쉽게 이해할 수 있도록 준비해놓았습니다. 저희 체험을 참가하게 된다면, 즐거운 시간 뿐만 아니라 새로운 스타일을 접할 수 있을 것입니다.",
  userId: 21,
  price: 10000,
  address: "서울특별시 강남구 테헤란로 427",
  bannerImageUrl:
    "https://i.pinimg.com/1200x/af/5c/05/af5c05a064697d5269496d237b20dbcd.jpg",
  subImages: [
    {
      id: 1,
      imageUrl:
        "https://i.pinimg.com/1200x/09/a1/c3/09a1c3eb89bf631952d9929e66b067bd.jpg",
    },
{
      id: 2,
      imageUrl:
        "https://i.pinimg.com/736x/1f/13/ff/1f13ff7f88baff4805ecd152393d24fa.jpg",
    },
    {
      id: 3,
      imageUrl:
        "https://i.pinimg.com/736x/be/f0/a2/bef0a2b8ab32e07f3ad48346e5ad77a7.jpg",
    },
    {
      id: 4,
      imageUrl:
        "https://i.pinimg.com/736x/31/2f/30/312f3058eabeffcd4da12fc063074b01.jpg",
    },


  
  ],
  reviewCount: 5,
  rating: 4.74,
  createdAt: "2023-12-31T21:28:50.589Z",
  updatedAt: "2023-12-31T21:28:50.589Z",
  schedules: [],
};

// 체험 예약 가능일 조회 mockdata
export const mockAvailableSchedule = [
  {
    date: "2025-10-15",
    times: [
      {
        id: 1,
        startTime: "09:00",
        endTime: "10:00",
      },
      {
        id: 2,
        startTime: "10:00",
        endTime: "11:00",
      },
      {
        id: 101,
        startTime: "11:00",
        endTime: "12:00",
      },
      {
        id: 102,
        startTime: "13:00",
        endTime: "14:00",
      },
      {
        id: 103,
        startTime: "14:00",
        endTime: "15:00",
      },
      {
        id: 104,
        startTime: "15:00",
        endTime: "16:00",
      },
      {
        id: 105,
        startTime: "16:00",
        endTime: "17:00",
      },
    ],
  },
  {
    date: "2025-10-16",
    times: [
      {
        id: 3,
        startTime: "09:30",
        endTime: "10:30",
      },
      {
        id: 4,
        startTime: "13:00",
        endTime: "14:00",
      },
      {
        id: 5,
        startTime: "16:00",
        endTime: "17:00",
      },
    ],
  },
  {
    date: "2025-10-18",
    times: [
      {
        id: 6,
        startTime: "11:00",
        endTime: "12:00",
      },
    ],
  },
];

// mockActivityReviews.ts
export const mockActivityReviews = {
  averageRating: 4.74,
  totalCount: 12,
  reviews: [
    {
      id: 1,
      user: {
        id: 1,
        profileImageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiDJFZppYH3gokfWy8BzxbV1R9HY7MC-SPAQ&s",
        nickname: "김태현",
      },
      activityId: 7,
      rating: 5,
      content:
        "스트릿 댄스 체험에 참가했는데 정말 즐거운 시간이었어요. 강사님도 친절하시고 초보자도 쉽게 배울 수 있었습니다!",
      createdAt: "2023-12-04T10:00:00.000Z",
      updatedAt: "2023-12-04T10:00:00.000Z",
    },
    {
      id: 2,
      user: {
        id: 2,
        profileImageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiDJFZppYH3gokfWy8BzxbV1R9HY7MC-SPAQ&s",
        nickname: "조민지",
      },
      activityId: 7,
      rating: 5,
      content:
        "새로운 사람들과 함께 춤추면서 친해질 수 있어서 좋았어요. 재밌고 활기찬 분위기였습니다.",
      createdAt: "2023-12-10T15:30:00.000Z",
      updatedAt: "2023-12-10T15:30:00.000Z",
    },
    {
      id: 3,
      user: {
        profileImageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiDJFZppYH3gokfWy8BzxbV1R9HY7MC-SPAQ&s",
        nickname: "박영수",
      },
      content:
        "가격 대비 만족도가 높았고, 다양한 춤 스타일을 접할 수 있었던 점이 인상 깊었습니다.",
      createdAt: "2023-12-20T19:45:00.000Z",
    },
    {
      id: 4,
      user: {
        profileImageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiDJFZppYH3gokfWy8BzxbV1R9HY7MC-SPAQ&s",
        nickname: "이은지",
      },
      content:
        "처음 참여했는데 생각보다 어렵지 않았고 분위기도 너무 즐거웠습니다. 또 참여하고 싶어요!",
      createdAt: "2023-12-25T14:20:00.000Z",
    },
    {
      id: 5,
      user: {
        profileImageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiDJFZppYH3gokfWy8BzxbV1R9HY7MC-SPAQ&s",
        nickname: "최민수",
      },
      content:
        "전문적인 강사님의 지도 아래 다양한 동작을 배울 수 있었습니다. 추천합니다!",
      createdAt: "2023-12-28T09:15:00.000Z",
    },
    {
      id: 6,
      user: {
        profileImageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiDJFZppYH3gokfWy8BzxbV1R9HY7MC-SPAQ&s",
        nickname: "한지우",
      },
      content:
        "운동 효과도 좋고 스트레스도 풀렸어요. 다음에도 꼭 참여하고 싶습니다.",
      createdAt: "2023-12-29T16:40:00.000Z",
    },
    {
      id: 7,
      user: {
        profileImageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiDJFZppYH3gokfWy8BzxbV1R9HY7MC-SPAQ&s",
        nickname: "정서연",
      },
      content:
        "음악과 함께하는 댄스 체험이 너무 즐거웠어요. 시간 가는 줄 몰랐습니다!",
      createdAt: "2024-01-02T11:20:00.000Z",
    },
    {
      id: 8,
      user: {
        profileImageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiDJFZppYH3gokfWy8BzxbV1R9HY7MC-SPAQ&s",
        nickname: "이도현",
      },
      content:
        "친구들과 함께 참여했는데 모두 만족했습니다. 좋은 추억이 되었어요.",
      createdAt: "2024-01-05T13:50:00.000Z",
    },
    {
      id: 9,
      user: {
        profileImageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiDJFZppYH3gokfWy8BzxbV1R9HY7MC-SPAQ&s",
        nickname: "강예린",
      },
      content:
        "초보자도 쉽게 따라할 수 있는 수업이었어요. 자신감이 생겼습니다!",
      createdAt: "2024-01-08T10:30:00.000Z",
    },
    {
      id: 10,
      user: {
        profileImageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiDJFZppYH3gokfWy8BzxbV1R9HY7MC-SPAQ&s",
        nickname: "박준호",
      },
      content:
        "에너지 넘치는 수업이었어요. 운동도 되고 재미도 있어서 일석이조!",
      createdAt: "2024-01-10T14:15:00.000Z",
    },
    {
      id: 11,
      user: {
        profileImageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiDJFZppYH3gokfWy8BzxbV1R9HY7MC-SPAQ&s",
        nickname: "윤서진",
      },
      content: "댄스에 대한 열정이 생겼어요. 다음 수업도 신청할 예정입니다.",
      createdAt: "2024-01-12T09:45:00.000Z",
    },
    {
      id: 12,
      user: {
        profileImageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiDJFZppYH3gokfWy8BzxbV1R9HY7MC-SPAQ&s",
        nickname: "김하은",
      },
      content:
        "분위기가 정말 좋았고, 강사님이 세심하게 알려주셔서 금방 배울 수 있었어요.",
      createdAt: "2024-01-15T16:00:00.000Z",
    },
    {
      id: 13,
      user: {
        profileImageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiDJFZppYH3gokfWy8BzxbV1R9HY7MC-SPAQ&s",
        nickname: "송민재",
      },
      content:
        "마지막 리뷰입니다. 정말 멋진 경험이었고, 모든 분들께 추천합니다!",
      createdAt: "2024-01-18T11:30:00.000Z",
    },
  ].map((review, index) => ({
    ...review,
    user: { id: index + 1, ...review.user },
    activityId: 7,
    rating: 5,
    updatedAt: review.createdAt,
  })).slice(0, 12),
};
