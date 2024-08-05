'use client';

import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Submit from '../Submit';

export default function UserInfo({ name, image }: { image: string, name: string }) {
  return (
    <form action={() => signOut()}>
      <p className="flex items-center">
        { image && (
          <Image 
            className="w-8 rounded-full mr-2" 
            src={ image }
            width={40} 
            height={40} 
            alt="프로필 이미지" />
        ) }
        { name }님 :)
        <Submit>로그아웃</Submit>
      </p>
    </form>
  );
}