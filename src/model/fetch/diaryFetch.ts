import { auth } from "@/auth";
import { ApiRes, MultiItem, Post, PostComment, SingleItem } from "@/types";

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const LIMIT = process.env.NEXT_PUBLIC_LIST_LIMIT;
const DELAY = process.env.NEXT_PUBLIC_DELAY_TIME;
const CLIENT_ID = process.env.NEXT_PUBLIC_API_SERVER_CLIENT_ID;

// 일기장 목록 조회
export async function fetchDiaries(
    type: string | undefined, 
    page?: string, 
    keyword?: string): Promise<ApiRes<MultiItem<Post>>>{

  const session = await auth();
  const params = new URLSearchParams();
  type && params.set('type', type);
  page && params.set('page', page);
  keyword && params.set('keyword', keyword);
  LIMIT && params.set('limit', LIMIT);
  DELAY && params.set('delay', DELAY);
  const url = `${SERVER}/posts/users?${params.toString()}`;
  // const url = `${SERVER}/posts?${params.toString()}`;
  const tags = ['posts'];
  if(type) tags.push(type);

  const res = await fetch(url, {
    headers: {
      'client-id': CLIENT_ID,
      Authorization: `Bearer ${session?.accessToken}`
    },
    next: {
      tags,
      revalidate: 10
    }
  });
  const resJson = await res.json();
  return resJson;
}

// 일기장 한건 조회
export async function fetchDiary(_id: string){
  const session = await auth();
  console.log('session', session);
  const url = `${SERVER}/posts/${_id}`;
  const res = await fetch(url, {
    headers: {
      'client-id': CLIENT_ID,
      Authorization: `Bearer ${session?.accessToken}`
    },
    next: { 
      revalidate: 1000 * 10
    }
  });
  const resJson: ApiRes<SingleItem<Post>> = await res.json();
  if(!resJson.ok){
    console.error(resJson);
    return null;
  }
  return resJson.item;
}

// 게시물 댓글 목록 조회
export async function fetchComments<T=PostComment>(_id: string){
  const url = `${SERVER}/posts/${_id}/replies`;
  const res = await fetch(url, {
    headers: {
      'client-id': CLIENT_ID
    },
  });
  const resJson: ApiRes<MultiItem<T>> = await res.json();
  if(!resJson.ok){
    console.error(resJson);
    throw new Error('댓글 목록 조회 실패');
  }
  return resJson.item;
}

// 게시물 댓글 한건 조회
export async function fetchComment(postId: string, commentId: string){
  const url = `${SERVER}/posts/${postId}/replies/${commentId}`;
  const res = await fetch(url, {
    headers: {
      'client-id': CLIENT_ID
    },
  });
  const resJson: ApiRes<SingleItem<PostComment>> = await res.json();
  if(!resJson.ok){
    console.error(resJson);
    return null;
  }
  return resJson.item;
}

// youtube 비디오 정보 조회
export async function fetchVideoInfo(videoId: string){
  const res = await fetch(`${process.env.NEXT_PUBLIC_NEXT_SERVER}/api/youtube?videoId=${videoId}`);
  return res.json();
};