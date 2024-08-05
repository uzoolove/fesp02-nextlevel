import { ReplyUser } from "./user"

export interface PostComment {
  _id: number,
  user_id: number,
  user: ReplyUser,
  content: string,
  like: number,
  // videoId?: string,
  extra?: Record<string, any>,
  createdAt: string,
  updatedAt: string,
}

export interface Post {
  _id: number,
  type?: string,
  title: string,
  content: string,
  user: ReplyUser,
  views: number,
  repliesCount: number,
  replies?: PostComment[],
  createdAt: string,
  updatedAt: string,
}


