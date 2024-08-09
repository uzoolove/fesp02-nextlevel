import { auth } from "@/auth";

interface CustomFetchOptions extends RequestInit {
  headers?: Record<string, string>; // 헤더의 타입을 명확히 정의
}

export default async function customFetch(url: string, options: CustomFetchOptions = {}) {
  const session = await auth();
  const defaultHeaders: Record<string, string> = {
    'Authorization': `Bearer ${session?.accessToken}`,
    'Content-Type': 'application/json',
    'client-id': process.env.NEXT_PUBLIC_API_SERVER_CLIENT_ID || ''
  };

  // 기존 옵션의 헤더와 병합
  const headers = {
    ...defaultHeaders,
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  return response.json();
}