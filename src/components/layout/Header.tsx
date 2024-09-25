import Link from "next/link";
import Image from "next/image";
import LoginInfo from "./LoginInfo";
import { auth } from "@/auth";
import Theme from "@/components/Theme";
import MainMenu from "@/components/layout/MainMenu";
import NotiBell from "@/components/NotiBell";
import { useEffect, useState } from "react";

export default async function Header() {
  const session = await auth();
  console.log('Header.tsx session?.user', session?.user)
  return (
    <header className="px-8 min-w-80 bg-slate-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 transition-color duration-500 ease-in-out">
      <nav className="flex flex-wrap justify-center items-center p-4 md:flex-nowrap md:justify-between">
        <div className="w-1/2 order-1 md:w-auto">
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/images/favicon.svg" 
              width="40" 
              height="40" 
              alt="로고 이미지" />
            <span className="text-lg font-bold">NextLevel</span>
          </Link>
        </div>
        <MainMenu />

        <div className="w-1/2 order-1 flex justify-end items-center md:order-2 md:w-auto">

          <LoginInfo />


          <Theme />
          
        </div>
      </nav>
    </header>
  );
}