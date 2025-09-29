/** 커서 종료 여부 판별 */
export const isEndByCursor = (cursorId?: number | null) =>
  cursorId === 0 || cursorId === null || cursorId === undefined;
