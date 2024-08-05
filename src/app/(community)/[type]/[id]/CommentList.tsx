import { fetchComments } from "@/model/fetch/postFetch";
import CommentItem from "./CommentItem";
import CommentNew from "./CommentNew";
import { PostComment } from "@/types";

export default async function CommentList({ type, id }: { type: string, id: string }) {
  const data = await fetchComments(id);
  const list = data.map(item => <CommentItem key={item._id} item={item} />);
  return (
    <section className="mb-8">
      <h4 className="mt-8 mb-4 ml-2">댓글 { list?.length || 0 }개</h4>
      { list }
      <CommentNew id={id} />
    </section>
  );
}