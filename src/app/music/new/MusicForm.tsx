'use client';

import InputError from "@/components/InputError";
import Submit from "@/components/Submit";
import { addPost } from "@/model/action/postAction";
import { MusicType } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function PostForm (){

  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<MusicType>();

  const onSubmit = async (postObj: MusicType) => {
    const postForm = new FormData();

    postForm.append('type', 'music');
    postForm.append('title', postObj.title);
    postForm.append('content', postObj.content);
    postObj.musicList && postForm.append('musicList', postObj.musicList);

    // 프로그래밍 방식으로 서버액션 호출
    const resData = await addPost(postForm);
    if(resData.ok){
      alert(`등록 되었습니다.`);
      router.back();
    }else{ // API 서버의 에러 메시지 처리
      alert(resData.message);
    }
  };

  return (
    <form onSubmit={ handleSubmit(onSubmit) }>
      <div className="my-4">
        <label className="block text-lg content-center" htmlFor="title">제목</label>
        <input
          id="title"
          type="text"
          placeholder="제목을 입력하세요." 
          className="w-full py-2 px-4 border rounded-md dark:bg-gray-700 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          { ...register('title', {
            required: '제목은 필수입니다.',
            minLength: {
              value: 2,
              message: '2글자 이상 입력하세요.'
            }
          }) }
        />
        <InputError target={ errors.title }/>
      </div>
      <div className="my-4">
        <label className="block text-lg content-center" htmlFor="content">내용</label>
        <textarea 
          id="content"
          rows={15} 
          placeholder="내용을 입력하세요."
          className="w-full p-4 text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          { ...register('content', {
            required: '내용은 필수입니다.',
            minLength: {
              value: 2,
              message: '2글자 이상 입력하세요.'
            }
          }) }></textarea>
        <InputError target={ errors.content }/>
      </div>
      <div className="my-4">
        <label className="block text-lg content-center" htmlFor="musicList">선곡</label>
        <input
          id="musicList"
          type="text"
          placeholder="유튜브 ID를 ,로 구분해 입력하세요." 
          className="w-full py-2 px-4 border rounded-md dark:bg-gray-700 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          { ...register('musicList', {
            pattern: {
              value: /^([A-Za-z0-9_-]{11})(?:\s*,\s*[A-Za-z0-9_-]{11})*$/,
              message: '유튜브 videoID는 11글자로 구성된 문자입니다.'
            }
          }) }
        />
        <InputError target={ errors.musicList }/>
      </div>
      <hr />
      <div className="flex justify-end my-6">
        <Submit>등록</Submit>
        <Link href={`/music`} className="bg-gray-900 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded">취소</Link>
      </div>
    </form>
  );
}