'use server';

import { signIn } from "@/auth";
import { redirect } from "next/navigation";

export async function signInWithCredentials(formData: FormData){
  try{
    console.log('signInWithCredentials 로그인 시작');
    const result = await signIn('credentials', {
      email: formData.get('email') || '',
      password: formData.get('password') || '',
      redirect: false,// default true, // try 블럭 내부에서 redirect를 실행하면 오류로 인식하고 catch 됨
      // redirectTo: '/notice' 
    });
    console.log('signInWithCredentials 로그인한 결과', result);
    // try 블럭 내부에서 redirect를 실행하면 오류로 인식하고 catch 됨
    // redirect('/');
  }catch(err){
    console.error('에러ㅓㅓㅓㅓㅓㅓㅓㅓㅓㅓㅓㅓㅓㅓㅓㅓㅓㅓㅓ');
    console.error(err);
  }
  redirect('/');
}