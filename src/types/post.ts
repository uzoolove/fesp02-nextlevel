import { MusicComment } from "./music";
import { ReplyUser } from "./user"

export interface PostComment {
  _id: number,
  user: ReplyUser,
  content: string,
  // videoId?: string,
  extra?: Record<string, any>,
  createdAt: string,
  updatedAt: string,
}

interface BasePost {
  _id: number,
  type?: string,
  content: string,
  user: ReplyUser,
  parivate?: boolean,
  createdAt: string,
  updatedAt: string,
}

export interface Post extends BasePost {
  title: string,
  views: number,
  repliesCount: number,
  replies?: PostComment[],
}

export interface Diary extends BasePost {
  title: string,
}