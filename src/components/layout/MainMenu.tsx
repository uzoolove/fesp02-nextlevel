'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MainMenu() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path ? 'cs-active' : '';

  return (
    <div className="w-auto order-2 text-base mt-4 md:mt-0">
      <ul className="flex items-center gap-6 uppercase">
        <li className={`${isActive('/info')} hover:text-amber-500 hover:font-semibold`}><Link href="/info">정보공유</Link></li>
        <li className={`${isActive('/notice')} hover:text-amber-500 a:font-semibold`}><Link href="/notice">공지게시판</Link></li>
        <li className={`${isActive('/music')} hover:text-amber-500 a:font-semibold`}><Link href="/music">음악 신청</Link></li>
      </ul>
    </div>
  );
}