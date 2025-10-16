/**
 * 한글 초성 검색 유틸리티
 *
 * 한글 초성으로 검색할 수 있도록 지원하는 함수
 * 예: "ㄱㄴㄷ" → "가나다", "김나다", "고나도" 등 매칭
 */

// 한글 초성 리스트
const CHOSUNG_LIST = [
  "ㄱ",
  "ㄲ",
  "ㄴ",
  "ㄷ",
  "ㄸ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅃ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅉ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];

// 한글 중성 리스트
const JUNGSUNG_LIST = [
  "ㅏ",
  "ㅐ",
  "ㅑ",
  "ㅒ",
  "ㅓ",
  "ㅔ",
  "ㅕ",
  "ㅖ",
  "ㅗ",
  "ㅘ",
  "ㅙ",
  "ㅚ",
  "ㅛ",
  "ㅜ",
  "ㅝ",
  "ㅞ",
  "ㅟ",
  "ㅠ",
  "ㅡ",
  "ㅢ",
  "ㅣ",
];

// 한글 종성 리스트
const JONGSUNG_LIST = [
  "",
  "ㄱ",
  "ㄲ",
  "ㄳ",
  "ㄴ",
  "ㄵ",
  "ㄶ",
  "ㄷ",
  "ㄹ",
  "ㄺ",
  "ㄻ",
  "ㄼ",
  "ㄽ",
  "ㄾ",
  "ㄿ",
  "ㅀ",
  "ㅁ",
  "ㅂ",
  "ㅄ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];

/**
 * 한글 문자를 초성, 중성, 종성으로 분해
 */
function decomposeHangul(char: string): {
  chosung: string;
  jungsung: string;
  jongsung: string;
} | null {
  const charCode = char.charCodeAt(0);

  // 한글 유니코드 범위: 0xAC00 ~ 0xD7A3
  if (charCode < 0xac00 || charCode > 0xd7a3) {
    return null;
  }

  const hangulCode = charCode - 0xac00;
  const chosungIndex = Math.floor(hangulCode / 588);
  const jungsungIndex = Math.floor((hangulCode % 588) / 28);
  const jongsungIndex = hangulCode % 28;

  return {
    chosung: CHOSUNG_LIST[chosungIndex],
    jungsung: JUNGSUNG_LIST[jungsungIndex],
    jongsung: JONGSUNG_LIST[jongsungIndex],
  };
}

/**
 * 문자열에서 초성만 추출
 */
export function extractChosung(text: string): string {
  return text
    .split("")
    .map((char) => {
      const decomposed = decomposeHangul(char);
      if (decomposed) {
        return decomposed.chosung;
      }
      return char;
    })
    .join("");
}

/**
 * 초성 검색 매칭 함수
 * @param target 검색 대상 문자열
 * @param query 검색어 (초성 또는 완성형 한글)
 * @returns 매칭 여부
 */
export function matchKoreanSearch(target: string, query: string): boolean {
  if (!target || !query) {
    return false;
  }

  const normalizedTarget = target.toLowerCase().trim();
  const normalizedQuery = query.toLowerCase().trim();

  // 1. 일반 문자열 매칭 (부분 문자열 검색)
  if (normalizedTarget.includes(normalizedQuery)) {
    return true;
  }

  // 2. 초성 매칭
  const targetChosung = extractChosung(target);
  const queryChosung = extractChosung(query);

  // 초성으로 변환한 검색어가 대상 문자열의 초성에 포함되는지 확인
  if (targetChosung.includes(queryChosung)) {
    return true;
  }

  // 3. 혼합 매칭 (초성 + 완성형 혼합)
  // 예: "ㄱㄴ다" → "가나다" 매칭
  let targetIndex = 0;
  let queryIndex = 0;

  while (targetIndex < target.length && queryIndex < query.length) {
    const targetChar = target[targetIndex];
    const queryChar = query[queryIndex];

    // 검색어가 초성인 경우
    if (CHOSUNG_LIST.includes(queryChar)) {
      const decomposed = decomposeHangul(targetChar);
      if (decomposed && decomposed.chosung === queryChar) {
        targetIndex++;
        queryIndex++;
      } else {
        targetIndex++;
      }
    }
    // 검색어가 완성형 한글인 경우
    else if (targetChar === queryChar) {
      targetIndex++;
      queryIndex++;
    }
    // 일반 문자 (영어, 숫자 등)
    else if (targetChar.toLowerCase() === queryChar.toLowerCase()) {
      targetIndex++;
      queryIndex++;
    } else {
      targetIndex++;
    }
  }

  // 모든 검색어가 매칭되었는지 확인
  return queryIndex === query.length;
}

/**
 * 배열에서 한글 초성 검색
 * @param items 검색할 아이템 배열
 * @param query 검색어
 * @param getSearchText 아이템에서 검색 대상 텍스트를 추출하는 함수
 * @returns 필터링된 배열
 */
export function searchKorean<T>(
  items: T[],
  query: string,
  getSearchText: (item: T) => string,
): T[] {
  if (!query || !query.trim()) {
    return items;
  }

  return items.filter((item) => {
    const searchText = getSearchText(item);
    return matchKoreanSearch(searchText, query);
  });
}
