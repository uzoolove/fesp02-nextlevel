'use client';

import InputError from "@/components/InputError";
import Submit from "@/components/Submit";
import { signInWithCredentials, signInWithGithub, signInWithGoogle } from "@/model/action/userAction";
import { UserForm, UserLoginForm } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginForm() {
  const notify = (msg: string) => toast(msg);
  const { register, handleSubmit, formState: { errors, isLoading, isSubmitted  }, setError } = useForm<UserForm>({
    defaultValues: {
      email: 's1@market.com',
      password: '11111111'
    }
  });

  const login = async (loginData: UserLoginForm) => {
    // 프로그래밍 방식으로 서버액션 호출
    // 로그인 성공시 리턴값 없음
    const resData = await signInWithCredentials(loginData);
    if(!resData){
      notify(`로그인 되었습니다.`);
      // router.push('/');
    }else if(!resData.ok){ // API 서버의 에러 메시지 처리
      if('errors' in resData){
        resData.errors.forEach(error => setError(error.path, { message: error.msg }));
      }else if(resData.message){
        notify(resData.message);
      }
    }
  }

  // if(isLoading) {
  //   console.log('로딩중...')
  //   return <p>로딩중...</p>
  // }

  return (
    <div>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-200 mb-2" htmlFor="email">이메일</label>
          <input
            id="email"
            type="email"
            placeholder="이메일을 입력하세요"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
            { ...register('email', {
              required: '이메일을 입력하세요.',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: '이메일 형식이 아닙니다.'
              }
            }) }
          />
          <InputError target={ errors.email }/>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-200 mb-2" htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
            { ...register('password', {
              required: '비밀번호를 입력하세요.'
            }) }
          />
          <InputError target={ errors.password }/>
          <Link href="#" className="block mt-6 ml-auto text-gray-500 text-sm dark:text-gray-300 hover:underline">비밀번호를 잊으셨나요?</Link>
        </div>
        <div className="mt-10 flex justify-center items-center">
          <Submit onClick={handleSubmit(login)}>로그인</Submit>
          <Submit formAction={signInWithGithub} style={{ border: 'none', background: 'none' }}>
            <Image src="/images/login/github.png"
              width={40}
              height={40}
              alt="깃허브 로그인"
              className="cursor-pointer"
            />
          </Submit>
          <Submit formAction={signInWithGoogle} style={{ border: 'none', background: 'none' }}>
            <Image src="/images/login/web_neutral_rd_na@2x.png"
              width={40}
              height={40}
              alt="구글 로그인"
              className="cursor-pointer"
            />
          </Submit>
            
          <Link href="/signup" className="ml-8 text-gray-800 hover:underline">회원가입</Link>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}