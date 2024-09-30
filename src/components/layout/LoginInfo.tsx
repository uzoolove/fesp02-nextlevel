'use client';

import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Button from '@/components/Button';
import NotiBell from '@/components/NotiBell';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function LoginInfo() {
  const { data: session, status, update } = useSession();

  const [notiBell, setNotiBell] = useState<JSX.Element | null>(null);

  console.log('session, status', session, status);

  useEffect(() => {
    console.log('session.user', session?.user);
    if (session?.user) {
      if(notiBell === null) setNotiBell(<NotiBell userId={session.user.id!} />);
    }
  }, [session]);

  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: 'https://next.fesp.shop' });
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <>
    { session?.user ? (
      <>
        <div className="block md:hidden">
          { notiBell }
        </div>
        <div className="hidden md:block">
          <div className="flex items-center">
            { session?.user?.image && (
              <Image 
                className="w-8 rounded-full mr-2" 
                src={ session.user.image }
                width={40} 
                height={40} 
                onClick={() => update({name: '홍길동'})}
                alt="프로필 이미지" />
            ) }
            { session?.user?.name }님 :)

            { notiBell }

            <Button onClick={handleSignOut}>로그아웃</Button>
          </div>
        </div>
      </>
    ) : (
      <div className="flex justify-end">
        <Link href="/login" className="bg-orange-500 py-1 px-2 text-sm text-white font-semibold ml-2 hover:bg-amber-400 rounded">로그인</Link>
        <Link href="/signup" className="bg-gray-900 py-1 px-2 text-sm text-white font-semibold ml-2 hover:bg-amber-400 rounded">회원가입</Link>
      </div>
    ) }
      
    </>
  );
}