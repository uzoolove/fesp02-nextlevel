import { Metadata } from "next";
import DiaryForm from "./DiaryForm";

export function generateMetadata(): Metadata {
  return {
    title: `일기장 등록`,
    description: `일기장을 등록하세요.`,
    openGraph: {
      title: `일기장 등록`,
      description: `일기장을 등록하세요.`,
      url: `/diary/new`
    }
  };
}

export default function Page() {

  return (
    <main className="min-w-[320px] p-4">
      <div className="text-center py-4">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">게시글 등록</h2>
      </div>
      <section className="mb-8 p-4">
        <DiaryForm />
      </section>
    </main>
  );
}