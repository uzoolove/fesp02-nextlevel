'use client';

import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Button from '@/components/Button';
import NotiBell from '@/components/NotiBell';

export default function LoginInfo({ userId, name, image }: { userId: string, name: string, image: string }) {
  const { update } = useSession();

  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: '/' });
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <div className="flex items-center">
      { image && (
        <Image 
          className="w-8 rounded-full mr-2" 
          src={ image }
          width={40} 
          height={40} 
          onClick={() => update({name: '홍길동'})}
          alt="프로필 이미지" />
      ) }
      { name }님 :)
      
      <NotiBell userId={userId} />

      <Button onClick={handleSignOut}>로그아웃</Button>
    </div>
  );
}