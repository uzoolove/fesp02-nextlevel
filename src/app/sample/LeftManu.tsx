'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LeftMenu(){
  const pathname = usePathname();
  const isActive = (path: string) => pathname.startsWith(path) ? 'cs-active' : '';
  return (
    <aside className="w-32 bg-gray-800 text-white p-6">
      <nav>
        <ul>
          <li className={`${isActive('/sample/kakao')} hover:text-amber-500 hover:font-semibold`}><Link href="/sample/kakao">카카오맵</Link></li>
          <li className={`${isActive('/sample/chat')} hover:text-amber-500 hover:font-semibold`}><Link href="/sample/chat">채팅</Link></li>
        </ul>
      </nav>
    </aside>
  );
}