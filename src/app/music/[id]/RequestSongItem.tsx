import Submit from "@/components/Submit";
import { MusicComment } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function RequestSongItem({ item }: { item: MusicComment }){
  return (
    <div className="shadow-md rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        { item.user.image &&
          <Image
            className="w-8 mr-2 rounded-full"
            width="40"
            height="40"
            src={process.env.NEXT_PUBLIC_API_SERVER + item.user.image}
            alt="프로필 이미지"
          />
        }
        <Link href="#" className="text-orange-400">{ item.name || item.user?.name }</Link>
        <time className="ml-auto text-gray-500" dateTime="{ item.updatedAt }">{ item.updatedAt }</time>
      </div>
      <div className="flex justify-between items-center mb-2">
        <form action="#">
          <pre className="whitespace-pre-wrap text-sm mb-2">{ item.content }</pre>
          <p className="mb-2">{ item.extra?.title && '신청곡: ' + item.extra?.title }</p>
          <Submit bgColor="red" size="sm">삭제</Submit>
        </form>
      </div>
    </div>
  );
}