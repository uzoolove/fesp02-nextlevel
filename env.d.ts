// declare namespace: 전역 네임스페이스를 확장하거나 새로 정의.
// 주로 Node.js 환경 변수 타입을 정의할 때 사용
declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_SERVER_CLIENT_ID: string;
    NEXT_PUBLIC_API_SERVER: string;
    NEXT_PUBLIC_NEXT_SERVER: string;
    NEXT_PUBLIC_LIST_LIMIT: string;
    NEXT_PUBLIC_DELAY_TIME: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    GITHUB_CLIENT_ID: string;
    GITHUB_CLIENT_SECRET: string;
    GOOGLE_API_KEY: string;

    NEXT_PUBLICE_WEBSOCKET_SERVER: string,
    NEXT_PUBLICE_WEBSOCKET_SERVER_NAMESPACE: string,
  }
}