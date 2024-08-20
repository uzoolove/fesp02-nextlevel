import { ReplyUser } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function UserInfo({ user }: { user: ReplyUser }) {
  return (
    <>
      {user && (
        <div className="flex items-center text-gray-400 relative group">
          {user.image && (
            <Image
              className="w-8 h-8 mr-2 rounded-full"
              width="40"
              height="40"
              src={`${!user.image.startsWith('http') ? process.env.NEXT_PUBLIC_API_SERVER : ''}${user.image}`}
              alt="프로필 이미지"
            />
          )}
          <span className="text-orange-400 cursor-pointer">{user.name}</span>

          <div className="relative">
            <div className="absolute right-0 top-full mt-2 hidden group-hover:block w-max">
              <div className="bg-black text-white text-sm py-2 rounded-lg shadow-lg z-10 flex flex-col">
                <Link href="/message" className="block hover:bg-gray-700 py-1 px-3 rounded">
                  쪽지 보내기
                </Link>
                <Link href="/chat" className="block hover:bg-gray-700 py-1 px-3 rounded">
                  1:1 채팅
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
