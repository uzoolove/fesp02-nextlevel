// export declare module: 특정 모듈의 타입을 확장하거나 변경.
// 주로 외부 라이브러리, 패키지의 타입을 확장할 때 사용
export declare module '@auth/core/types' {
  interface User {
    type: string,
    accessToken: string,
    refreshToken: string,
  }
  interface Session {
    accessToken: string,
    refreshToken: string,
  }
}
export declare module '@auth/core/jwt' {
  interface JWT {
    accessToken: string,
    refreshToken: string,
  }
}