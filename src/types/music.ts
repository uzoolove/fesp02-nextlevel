import { PostComment } from "./post";
import { ReplyUser } from "./user";

export interface VideoType {
  videoId: string,
  artist: string,
  title: string,
  reply_id: number,
  comment: {
    user: string,
    dj: string,
  }
}

export interface PlayHistory {
  post_id: string,
  title: string,
  timestamp: string,
}

export interface MusicComment extends PostComment{
  videoId: string,
}