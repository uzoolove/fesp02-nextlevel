'use client';

import Submit from "@/components/Submit";
import { deletePost } from "@/model/action/postAction";
import { Post } from "@/types";
import Link from "next/link";

export default function InfoForm({ id, type, item }: { id: string, type: string, item: Post }) {
  return (
    <section className="mb-8 p-4">
      <form action={ deletePost }>
        <input type="hidden" name="_id" value={id} />
        <div className="font-semibold text-xl">제목 : { item.title }</div>
        <div className="text-right text-gray-400">작성자 : { item.user?.name }</div>
        <div className="mb-4">
          <div>
            <pre className="font-roboto w-full p-2 whitespace-pre-wrap">{ item.content }</pre>
          </div>
          <hr/>
        </div>
        <div className="flex justify-end my-4">
          <Link href={`/${type}`} className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded">목록</Link>
          <Link href={`/${type}/${id}/edit`} className="bg-gray-900 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded">수정</Link>
          <Submit bgColor="red">삭제</Submit>
        </div>
      </form>
    </section>
  );
}