'use server';

import { ApiRes, CoreRes, SingleItem, Post, PostComment, MusicType, MusicComment } from "@/types/index";
import { auth } from "@/auth";
import { revalidatePath, revalidateTag } from "next/cache";
import { fetchVideoInfo } from "../fetch/postFetch";

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const CLIENT_ID = process.env.NEXT_PUBLIC_API_SERVER_CLIENT_ID;

// 게시물 등록
export async function addPost(formData: FormData): Promise<ApiRes<SingleItem<Post | MusicType>>> {
  const session = await auth();
  console.log('session', session);
  const postData = {
    type: formData.get('type'),
    title: formData.get('title'),
    private: Boolean(formData.get('private')),
    content: formData.get('content'),
  }

  if(postData.type === 'music'){
    const musicList = formData.get('musicList') as string;
    if(musicList){
      const videoInfoPromise = musicList.split(',').map(async (videoId, index) => {
        const res = await fetchVideoInfo(videoId.trim());
        return {
          _id: index + 1,
          videoId: videoId.trim(),
          extra: {
            title: res.data.title
          },
          createdAt: '',
          updatedAt: '',
          user: {
            _id: Number(session?.user?.id),
            name: '',
          },
          content: ''
        };
      });
      const videoInfoList: MusicComment[] = await Promise.all(videoInfoPromise);
      (postData as MusicType).videoInfoList = videoInfoList;
    }
  }

  const res = await fetch(`${SERVER}/posts`, {
    method: 'POST',
    headers: {
      'client-id': CLIENT_ID,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.accessToken}`
    },
    body: JSON.stringify(postData),
  });
  
  // 목록 조회한 캐시 삭제
  // revalidatePath('/posts');

  if(typeof postData.type === 'string'){
    revalidateTag(postData.type);
  }
  
  return res.json();
}

// 게시물 수정
export async function updatePost(formData: FormData): Promise<ApiRes<SingleItem<Post>>> {
  const session = await auth();
  const postData = {
    type: formData.get('type') || 'info',
    title: formData.get('title') || '',
    content: formData.get('content') || '',
  }

  const res = await fetch(`${SERVER}/posts/${formData.get('_id')}`, {
    method: 'PATCH',
    headers: {
      'client-id': CLIENT_ID,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.accessToken}`
    },
    body: JSON.stringify(postData),
  });
  
  return res.json();
}

// 게시물 삭제
export async function deletePost(formData: FormData): Promise<CoreRes> {
  const session = await auth();
  console.log(formData.get('_id'), '삭제 시도.');
  const res = await fetch(`${SERVER}/posts/${formData.get('_id')}`, {
    method: 'DELETE',
    headers: {
      'client-id': CLIENT_ID,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.accessToken}`
    },
  });
  console.log(res);
  return res.json();
}

// 댓글 등록
export async function addComment(postId: string, formData: PostComment): Promise<SingleItem<PostComment>>{
  const session = await auth();
  console.log('addComment session', session);
  const res = await fetch(`${SERVER}/posts/${postId}/replies`, {
    method: 'POST',
    headers: {
      'client-id': CLIENT_ID,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.accessToken}`
    },
    body: JSON.stringify(formData),
  });
const resJson = await res.json();
  console.log(resJson)
  return resJson;
}

// 댓글 삭제
export async function deleteComment(postId: string, formData: FormData){
  const session = await auth();
  const res = await fetch(`${SERVER}/posts/${postId}/replies/${formData.get('_id')}`, {
    method: 'DELETE',
    headers: {
      'client-id': CLIENT_ID,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.accessToken}`
    }
  });
  
  // const resData: Promise<CoreRes> = res.json();

  return res.json();
}