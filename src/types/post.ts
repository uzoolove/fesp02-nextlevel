import { CommonType } from "@/types/common";
import { MusicComment } from "./music";
import { ReplyUser } from "./user"

export interface PostComment extends CommonType{
  user: ReplyUser,
  content: string,
  // videoId?: string,
}

interface BasePost extends CommonType {
  type?: string,
  content: string,
  user: ReplyUser,
  parivate?: boolean,
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