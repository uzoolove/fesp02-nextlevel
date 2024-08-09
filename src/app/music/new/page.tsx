import { Metadata } from "next";
import PostForm from "./MusicForm";

export function generateMetadata({ params }: { params: { type: string } }): Metadata {
  const boardName = params.type;
  return {
    title: `${boardName} - DJ 게시글 등록`,
    description: `${boardName} - DJ 게시글을 등록하세요.`,
    openGraph: {
      title: `${boardName} - DJ 게시글 등록`,
      description: `${boardName} - DJ 게시글을 등록하세요.`,
      url: `/${params.type}/new`
    }
  };
}

export default function Page({ params }: { params: { type: string } }) {

  return (
    <main className="min-w-[320px] p-4">
      <div className="text-center py-4">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">DJ 게시글 등록</h2>
      </div>
      <section className="mb-8 p-4">
        <PostForm />
      </section>
    </main>
  );
}