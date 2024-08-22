import LeftMenu from '@/app/sample/LeftManu';
import React from 'react';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="flex min-h-screen">
      <LeftMenu />

      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}
