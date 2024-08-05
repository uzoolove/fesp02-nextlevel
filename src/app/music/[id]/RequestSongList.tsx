import { MusicComment, PostComment } from "@/types";
import RequestSongItem from "./RequestSongItem";
import RequestSongNew from "./RequestSongNew";
import { fetchComments } from "@/model/fetch/postFetch";

export default async function RequestSongList({ type, id }: { type: string, id: string }) {
  const data = await fetchComments(id) as MusicComment[];
  const list = data.map(item => <RequestSongItem key={item._id} item={item} />);
  return (
    <section className="mb-8">
      <h4 className="mt-8 mb-4 ml-2">신청곡 { list?.length || 0 }개</h4>
      { list }
      <RequestSongNew id={id} />
    </section>
  );
}