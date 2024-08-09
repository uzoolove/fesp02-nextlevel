import { PostComment } from "./post";

export interface PlayHistory {
  post_id: string,
  title: string,
  timestamp: string,
}

export interface MusicComment extends PostComment{
  videoId: string
}