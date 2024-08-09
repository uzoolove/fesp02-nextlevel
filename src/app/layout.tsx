import "./globals.css";
import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SessionProvider } from "next-auth/react";
import ReactQueryProviders from "@/hooks/useReactQuery";

export const metadata: Metadata = {
  // url 관련 metadata 설정시 사용될 기본 경로 지정
  metadataBase: new URL('https://nextlevel.fesp.shop'),

  title: {
    default: '멋쟁이 사자처럼 커뮤니티 - NextLevel',
    template: '%s | NextLevel',
  },
  description: '다양한 주제의 커뮤니티와 활발한 소통을 위한 플랫폼입니다. 관심사에 따라 참여하고, 의견을 나누세요.',
  keywords: ['커뮤니티', '소통', '포럼', '관심사', '온라인 모임', '커뮤니티 서비스'],
  authors: [{ name: 'FESP 2기' }],
  openGraph: {
    title: 'NextLevel에 오신걸 환영합니다.',
    description: '유용한 정보를 나누고 공유하세요.',
    images: 'https://nextlevel.fesp.shop/images/nextlevel.png',
    url: 'https://nextlevel.fesp.shop',
    type: 'website',
    siteName: 'NextLevel',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <div id="root">
          <div className="flex flex-col min-h-screen dark:bg-gray-700 dark:text-gray-200 transition-color duration-500 ease-in-out">
            <ReactQueryProviders>
              <SessionProvider>
                <Header />
                { children }
                <Footer />
              </SessionProvider>
            </ReactQueryProviders>
          </div>
        </div>
      </body>
    </html>
  );
}
