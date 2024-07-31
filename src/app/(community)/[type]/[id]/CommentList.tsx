import CommentItem from "./CommentItem";
import CommentNew from "./CommentNew";

export default function CommentList() {
  const list = [<CommentItem key={1} />, <CommentItem key={2} />];
  return (
    <section className="mb-8">
      <h4 className="mt-8 mb-4 ml-2">댓글 { list?.length || 0 }개</h4>
      { list }
      <CommentNew />
    </section>
  );
}