import { ApiRes, MultiItem, Post, PostComment, SingleItem } from "@/types";

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const LIMIT = process.env.NEXT_PUBLIC_LIST_LIMIT;
const DELAY = process.env.NEXT_PUBLIC_DELAY_TIME;

export async function fetchPosts(
    type: string | undefined, 
    page?: string, 
    keyword?: string): Promise<Post[]>{
  const params = new URLSearchParams();
  type && params.set('type', type);
  page && params.set('page', page);
  keyword && params.set('keyword', keyword);
  params.set('limit', LIMIT);
  params.set('delay', DELAY);
  const url = `${SERVER}/posts?${params.toString()}`;
  const res = await fetch(url, {
    headers: {
      'client-id': '00-next-level'
    },
  });
  const resJson: ApiRes<MultiItem<Post>> = await res.json();
  if(!resJson.ok){
    throw new Error('게시물 목록 조회 실패');
  }
  return resJson.item;
}

export async function fetchPost(_id: string){
  const url = `${SERVER}/posts/${_id}`;
  const res = await fetch(url, {
    headers: {
      'client-id': '00-next-level'
    },
  });
  const resJson: ApiRes<SingleItem<Post>> = await res.json();
  if(!resJson.ok){
    return null;
  }
  return resJson.item;
}

export async function fetchComments(_id: string){
  const url = `${SERVER}/posts/${_id}/replies`;
  const res = await fetch(url, {
    headers: {
      'client-id': '00-next-level'
    },
  });
  const resJson: ApiRes<MultiItem<PostComment>> = await res.json();
  console.log(resJson);
  if(!resJson.ok){
    throw new Error('댓글 목록 조회 실패');
  }
  return resJson.item;
}

export async function fetchComment(postId: string, commentId: string){
  const url = `${SERVER}/posts/${postId}/replies/${commentId}`;
  const res = await fetch(url, {
    headers: {
      'client-id': '00-next-level'
    },
  });
  const resJson: ApiRes<SingleItem<PostComment>> = await res.json();
  if(!resJson.ok){
    return null;
  }
  return resJson.item;
}