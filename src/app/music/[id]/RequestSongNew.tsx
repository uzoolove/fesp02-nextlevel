'use client';

import InputError from "@/components/InputError";
import Submit from "@/components/Submit";
import { addComment } from "@/model/action/postAction";
import { MusicComment } from "@/types";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { fetchVideoInfo } from '@/model/fetch/postFetch';

export default function RequestSongNew({ id, onNewSong }: { id: string, onNewSong: () => Promise<void> } ) {
  // const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<MusicComment>();

  const handleAdd = async (commentObj: MusicComment) => {
    if(commentObj.videoId){
      commentObj.videoId = commentObj.videoId.slice(-11);
      const res = await fetchVideoInfo(commentObj.videoId);
      if(res.data){
        commentObj.extra = res.data;
      }else{
        alert('유튜브에 동영상이 없습니다.');
        return false;
      }
    }
    addComment(id, commentObj);
    onNewSong();
    // router.refresh();
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg">

      <h4 className="mb-4">노래 신청</h4>
      <form onSubmit={ handleSubmit(handleAdd) }>
        <div className="mb-4">
          <div className="flex items-center">
            <label className="block text-gray-700 dark:text-gray-200 mb-2 mr-4" htmlFor="name">작성자</label>
            <input
              id="name"
              type="text"
              placeholder="작성자"
              className="w-48 px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              { ...register('name') }
            />
          </div>
          <div className="flex items-center">
            <label className="block text-gray-700 dark:text-gray-200 mb-2 mr-4" htmlFor="videoId">신청곡</label>
            <input
              id="videoId"
              type="text"
              placeholder="유튜브 URL이나 ID를 입력하세요"
              className="w-96 px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              { ...register('videoId', {
                // required: '유튜브 URL이나 비디오 ID를 입력하세요.',
                pattern: {
                  value: /^(https:\/\/www\.youtube\.com\/watch\?v=)?[A-Za-z0-9_-]{11}$/,
                  message: '유튜브 형식이 아닙니다.'
                }
              }) }
            />
          </div>
          <InputError target={ errors.videoId }/>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-200 mb-2" htmlFor="content">사연</label>
          <textarea
            id="content"
            rows={3}
            cols={40}
            className="block p-2 w-full text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="디제이가 읽어줄 사연을 입력하세요."
            { ...register('content') }></textarea>
            
            <InputError target={ errors.content } />
          
        </div>
        <Submit size="sm">신청</Submit>
      </form>
    </div>
  );
}
