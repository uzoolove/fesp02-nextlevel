import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth, { AuthError, CredentialsSignin } from "next-auth";
import { login } from './model/action/userAction';
import { UserForm } from './types';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true, // 배포시 필요
  providers: [ 
    CredentialsProvider({
      // email/password 정보로 로그인 요청
      async authorize(credentials) { // credentials: 서버 액션에서 호출한 signIn('credentials', 사용자 정보) 메소드의 두번째 인수(사용자 정보)
        const resJson = await login(credentials as UserForm);

        if(resJson.ok){
        
          const user = resJson.item;
          return {
            id: String(user._id),
            email: user.email,
            name: user.name,
            type: user.type,
            image: user.image && (SERVER + user.image),
            accessToken: user.token!.accessToken,
            refreshToken: user.token!.refreshToken,
          };
          
          
        }else{
          const error = new CredentialsSignin();
          error.code = resJson.message;
          throw error;
          // console.error(resJson.message);
          // throw new AuthError(resJson.message);
        }

      }
    })
  ],
  session: {
    strategy: 'jwt', // JSON Web Token 사용(기본값)
    // maxAge: 60 * 60 * 24, // 세션 만료 시간(sec)
    maxAge: 60,
  },
  pages: {
    signIn: '/notice' // Default: '/auth/signin'
  },
  callbacks: {
    // 로그인 처리를 계속 할지 여부 결정
    // signIn 콜백은 true를 반환하면 로그인 처리를 계속하고,
    // false를 반환하거나 오류를 던지면 로그인 흐름을 중단하여 사용자에게 오류 페이지로 리디렉션
    // user: authorize()가 리턴한 객체
    // account: provider 정보
    // credentials: authorize()에 전달된 로그인 정보(사용자가 입력한 id, password 등)
    async signIn({user, account, profile, email, credentials}) {
      // console.log(user, account, profile, email, credentials);
      console.log('callbacks.signIn');

      switch(account?.provider){
        case 'credentials':
          /*
            {
              id: '2',
              email: 's1@market.com',
              name: '네오',
              type: 'seller',
              image: 'https://api.fesp.shop/files/00-sample/user-neo.webp',
              accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjIsInR5cGUiOiJzZWxsZXIiLCJuYW1lIjoi64Sk7JikIiwicHJvZmlsZSI6Ii9maWxlcy8wMC1zYW1wbGUvdXNlci1uZW8ud2VicCIsImxvZ2luVHlwZSI6ImVtYWlsIiwiaWF0IjoxNzIxOTUzNDA0LCJleHAiOjE3MjIwMzk4MDQsImlzcyI6IkZFU1AifQ.QXQZjS4_3t_mIAB7AImDnyXAuoooziYoXpplOO1y0zc',
              refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjE5NTM0MDQsImV4cCI6MTcyNDU0NTQwNCwiaXNzIjoiRkVTUCJ9.oUdRnbvof1UiSKKD--tz-_iaZOXMz5ng7ceiFRgn0iM'
            }
          */
          console.log('로그인 정보', user);
          break;
        case 'google':
          /*
            {
              id: '409716c3-f6d3-4988-bf0e-062d85b3114e',
              name: 'dainhome',
              email: 'homedain01@gmail.com',
              image: 'https://lh3.googleusercontent.com/a/ACg8ocKqRBGG4QfyzlASvT7kARFlFHW7s8tQ6XQ-3fDQD6U7lLsqHQ=s96-c'   
            }
          */
          console.log('구글 로그인 정보', user);
          // DB에서 id를 조회해서 있으면 로그인 처리를 없으면 자동 회원 가입 후 로그인 처리
          // API 서버에 해당 기능 추가 예정
          break;
        case 'github':
          /*
            {
              id: 'b43446d2-6bf5-4a5c-83a6-7574e39df9f5',
              name: 'Kilyong Jeong',
              email: 'uzoolove@gmail.com',
              image: 'https://avatars.githubusercontent.com/u/7599569?v=4'
            }
          */
          console.log('깃허브 로그인 정보', user);
          break;
      }

      return true
    },
    // 로그인 성공한 회원 정보로 token 객체 설정
    // 최초 로그인시 user 객체 전달, 업데이트시 user는 없음
    async jwt({ token, user }) {
      console.log('callbacks.jwt');
      // 토큰 만료 체크, 리플래시 토큰으로 재발급
      // 리플레시 토큰도 만료되었으면 로그아웃 처리
      if (user) {
        token.id = user.id;
        token.type = user.type;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
    // token 객체 정보로 session 객체 설정
    // 클라이언트에서 세션 정보 요청시 호출
    async session({ session, token }) {
      console.log('callbacks.session');
      session.user.id = token.id as string;
      session.user.type = token.type as string;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return session;
    },

    // async redirect({ url, baseUrl }) {
    //   console.log('redirect', url, baseUrl)
    //   return '/qna'
    // }
  },
})