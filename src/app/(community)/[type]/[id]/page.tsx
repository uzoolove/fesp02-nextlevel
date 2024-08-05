import { Metadata } from "next";
import CommentList from "./CommentList";
import { fetchPost } from "@/model/fetch/postFetch";
import { notFound } from "next/navigation";
import InfoForm from "./InfoForm";

export async function generateMetadata({ params }: { params: { type: string, id: string } }): Promise<Metadata | null>{
  const item = await fetchPost(params.id);
  if(item){
    const description = item.content.length>150 ? item.content.slice(0, 150) + '...': item.content;
    
    const boardName = params.type;
    return {
      title: {
        absolute: `${boardName} - ${item.title}`
      },
      description: `${boardName} - ${description}`,
      openGraph: {
        title: `${boardName} - ${item.title}`,
        description: `${boardName} - ${description}`,
        url: `/${params.type}/${params.id}`
      }
    };
  }else{
    return null;
  }
  
}

export async function generateStaticParams(){
  return [
    { type: 'notice', id: '4' },
    { type: 'notice', id: '5' },
  ];
}

export default async function Page({ params }: { params: { type: string, id: string } }) {
  const item = await fetchPost(params.id);
  if(item === null) notFound();
  return (
    <main className="container mx-auto mt-4 px-4">

      <InfoForm id={params.id} type={params.type} item={item} />

      <CommentList type={params.type} id={params.id} />

    </main>
  );
}