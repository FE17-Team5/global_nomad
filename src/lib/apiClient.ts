export const BASE_URL = "https://sp-globalnomad-api.vercel.app/17-5";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type ApiOptions = {
  method?: HttpMethod;
  query?: Record<string, unknown>;
  body?: unknown; // JSON 객체 또는 FormData
  headers?: Record<string, string>;
  authToken?: string; // 있으면 Authorization 헤더 추가
};

/**
 * 공통 fetch 래퍼
 * - query 직렬화
 * - JSON 기본 전송, FormData는 그대로 전송
 * - 에러 시 { status, message } throw
 */
export async function apiFetch<T>(
  path: string,
  { method = "GET", query, body, headers = {}, authToken }: ApiOptions = {},
): Promise<T> {
  const url = new URL(`${BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`);
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v === undefined || v === null) continue;
      url.searchParams.set(k, String(v));
    }
  }

  const isForm = typeof FormData !== "undefined" && body instanceof FormData;

  const res = await fetch(url.toString(), {
    method,
    headers: {
      ...(isForm ? {} : { "Content-Type": "application/json" }),
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      ...headers,
    },
    body: body
      ? isForm
        ? (body as FormData)
        : JSON.stringify(body)
      : undefined,
  });

  if (!res.ok) {
    let err: unknown;
    try {
      err = await res.json();
    } catch {
      err = { message: res.statusText };
    }
    throw {
      status: res.status,
      ...(typeof err === "object" ? err : { message: String(err) }),
    };
  }

  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}
