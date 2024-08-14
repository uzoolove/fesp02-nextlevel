import { Metadata } from "next";
import MusicForm from "./MusicForm";

export function generateMetadata(): Metadata {
  const boardName = '음악 신청';
  return {
    title: `${boardName} - DJ 게시글 등록`,
    description: `${boardName} - DJ 게시글을 등록하세요.`,
    openGraph: {
      title: `${boardName} - DJ 게시글 등록`,
      description: `${boardName} - DJ 게시글을 등록하세요.`,
      url: `/music/new`
    }
  };
}

export default function Page() {

  return (
    <main className="min-w-[320px] p-4">
      <div className="text-center py-4">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">DJ 게시글 등록</h2>
      </div>
      <section className="mb-8 p-4">
        <MusicForm />
      </section>
    </main>
  );
}