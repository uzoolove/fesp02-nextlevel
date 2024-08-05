'use server';

import { ApiRes, CoreRes, SingleItem, Post, PostComment } from "@/types/index";
import { auth } from "@/auth";

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;

export async function addPost(formData: FormData): Promise<ApiRes<SingleItem<Post>>> {
  const session = await auth();
  console.log('session', session);
  const postData = {
    type: formData.get('type') || 'info',
    title: formData.get('title'),
    content: formData.get('content'),
  }

  const res = await fetch(`${SERVER}/posts`, {
    method: 'POST',
    headers: {
      'client-id': '00-next-level',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.accessToken}`
    },
    body: JSON.stringify(postData),
  });
  console.log(formData)
  console.log(res);
  return res.json();
}

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
      'client-id': '00-next-level',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.accessToken}`
    },
    body: JSON.stringify(postData),
  });
  
  return res.json();
}

export async function deletePost(formData: FormData): Promise<CoreRes> {
  const session = await auth();
  console.log(formData.get('_id'), '삭제 시도.');
  const res = await fetch(`${SERVER}/posts/${formData.get('_id')}`, {
    method: 'DELETE',
    headers: {
      'client-id': '00-next-level',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.accessToken}`
    },
  });
  console.log(res);
  return res.json();
}

export async function addComment(postId: string, formData: PostComment): Promise<SingleItem<PostComment>>{
  const session = await auth();
  console.log('addComment session', session);
  const res = await fetch(`${SERVER}/posts/${postId}/replies`, {
    method: 'POST',
    headers: {
      'client-id': '00-next-level',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.accessToken}`
    },
    body: JSON.stringify(formData),
  });
const resJson = await res.json();
  console.log(resJson)
  return resJson;
}

export async function deleteComment(postId: string, formData: FormData){
  const session = await auth();
  const res = await fetch(`${SERVER}/posts/${postId}/replies/${formData.get('_id')}`, {
    method: 'DELETE',
    headers: {
      'client-id': '00-next-level',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.accessToken}`
    }
  });
  
  // const resData: Promise<CoreRes> = res.json();

  return res.json();
}