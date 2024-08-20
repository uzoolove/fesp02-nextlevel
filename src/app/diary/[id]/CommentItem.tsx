import Submit from "@/components/Submit";
import UserInfo from "@/components/UserInfo";
import { PostComment } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function CommentItem({ item }: { item: PostComment }){
  console.log(item)
  return (
    <div className="shadow-md rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <UserInfo user={item.user} />
        <time className="ml-auto text-gray-500" dateTime={item.updatedAt}>{item.updatedAt}</time>
      </div>
      <div className="flex justify-between items-center mb-2">
        <form action="#">
          <pre className="whitespace-pre-wrap text-sm">{item.content}</pre>
          <Submit bgColor="red" size="sm">삭제</Submit>
        </form>
      </div>
    </div>
  );
}