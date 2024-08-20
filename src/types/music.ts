import { Post, PostComment } from "./post";

export interface PlayHistory {
  post_id: string,
  title: string,
  timestamp: string,
}

export interface MusicComment extends PostComment{
  videoId: string,
  name?: string,
}

export type MusicType = Pick<Post, 'title' | 'content'> & {
  musicList?: string,
  videoInfoList?: MusicComment[]
};

