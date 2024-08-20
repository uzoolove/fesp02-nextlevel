'use client';

import { MusicComment } from "@/types";
import RequestSongItem from "./RequestSongItem";
import RequestSongNew from "./RequestSongNew";
import { fetchComments } from "@/model/fetch/postFetch";
import { useEffect, useState } from "react";

export default function RequestSongList({ type, id }: { type: string, id: string }) {
  // const data = await fetchComments(id) as MusicComment[];
  // const list = data.map(item => <RequestSongItem key={item._id} item={item} />);

  const [requestSongList, setRequestSongList] = useState<MusicComment[]>([]);

  const fetchData = async (postId: string) => {
    const data = await fetchComments(postId) as MusicComment[];
    setRequestSongList(data);
  };
  
  useEffect(() => {
    fetchData(id);
  }, [id]); // id가 변경될 때만 fetchData 실행
  
  const handleNewSong = async () => {
    fetchData(id);
  };

  const list = requestSongList.map(item => <RequestSongItem key={item._id} item={item} />);


  return (
    <section className="mb-8">
      <h4 className="mt-8 mb-4 ml-2">신청곡 { list?.length || 0 }개</h4>
      { list }

      <RequestSongNew id={id} onNewSong={handleNewSong} />
    </section>
  );
}