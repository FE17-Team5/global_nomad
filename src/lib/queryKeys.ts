export const qk = {
  activities: (filters?: unknown) => ["activities", filters] as const,
  myActivities: (filters?: unknown) => ["my-activities", filters] as const,
  myNotifications: (filters?: unknown) => ["my-notifications", filters] as const,
  myReservations: (filters?: unknown) => ["my-reservations", filters] as const,
  activityDetail: (id: number | string) => ["activity", id] as const,
};
