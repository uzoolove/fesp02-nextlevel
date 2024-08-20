'use client';

import Submit from "@/components/Submit";
import UserInfo from "@/components/UserInfo";
import { deletePost } from "@/model/action/postAction";
import { Post } from "@/types";
import Link from "next/link";

export default function InfoForm({ id, item }: { id: string, item: Post }) {
  return (
    <section className="mb-2 p-4">
      <form action={deletePost}>
        <input type="hidden" name="_id" value={id} />
        <div className="font-semibold text-xl">제목 : {item.title}</div>

        <UserInfo user={item.user} />

        <div className="mb-4">
          <div>
            <pre className="font-roboto w-full p-2 whitespace-pre-wrap">{item.content}</pre>
          </div>
          <hr />
        </div>
        <div className="flex justify-end my-4">
          <Link href={`/${item.type}`} className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded">
            목록
          </Link>
          <Link href={`/${item.type}/${id}/edit`} className="bg-gray-900 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded">
            수정
          </Link>
          <Submit bgColor="red">삭제</Submit>
        </div>
      </form>
    </section>
  );
}