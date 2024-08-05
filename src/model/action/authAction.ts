'use server';

import { signIn } from "@/auth";
import { ApiResWithValidation, CoreErrorRes, SingleItem, UserForm, UserLoginForm } from "@/types";
import { redirect } from "next/navigation";

export async function signInWithCredentials(loginData: UserLoginForm): Promise<ApiResWithValidation<SingleItem<UserForm>, UserLoginForm>> {
  try{
    const result = await signIn('credentials', { ...loginData, redirect: false, redirectTo: '/movies' });
    console.log('signInWithCredentials 로그인한 결과', result);
  }catch(err){
    if(err instanceof Error){
      return err.cause as CoreErrorRes;
    }
  }
  redirect('/');
}


// export async function signInWithCredentials(initialState: { message: string }, formData: FormData) {
// export async function signInWithCredentials(formData: FormData) {
//   try{
//     console.log('signInWithCredentials 로그인 시작');
//     const result = await signIn('credentials', {
//       email: formData.get('email') || '',
//       password: formData.get('password') || '',
//       redirect: false,// default true, // try 블럭 내부에서 redirect를 실행하면 오류로 인식하고 catch 됨
//       // redirectTo: '/notice' //
//     });
//     console.log('signInWithCredentials 로그인한 결과', result);
//     // try 블럭 내부에서 redirect를 실행하면 오류로 인식하고 catch 됨
//     // redirect('/');
//   }catch(err){
//     if(err instanceof Error){
//       return err.cause;
//     }
//   }
//   redirect('/');
// }

// export async function signInWithCredentials(initialState: { message: string }, formData: FormData): Promise<ApiResWithValidation<SingleItem<UserForm>, UserLoginForm>>{
//   try{
//     console.log('signInWithCredentials 로그인 시작');
//     const result = await signIn('credentials', {
//       email: formData.get('email') || '',
//       password: formData.get('password') || '',
//       redirect: false,// default true, // try 블럭 내부에서 redirect를 실행하면 오류로 인식하고 catch 됨
//       // redirectTo: '/notice' //
//     });
//     console.log('signInWithCredentials 로그인한 결과', result);
//     // try 블럭 내부에서 redirect를 실행하면 오류로 인식하고 catch 됨
//     // redirect('/');
//   }catch(err){
//     throw err;
//   }
//   redirect('/');
// }