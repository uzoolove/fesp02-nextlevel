import { Metadata } from "next";
import RequestSongList from "./RequestSongList";
import { fetchPost } from "@/model/fetch/postFetch";
import { generateMetadata as generateMetadataInfo } from "@/app/(community)/[type]/[id]/page";
import { notFound } from "next/navigation";
import InfoForm from "@/app/(community)/[type]/[id]/InfoForm";
import PlayerContainer from "./PlayerContainer";

export async function generateMetadata({ params }: { params: { type: string, id: string } }): Promise<Metadata | null>{
  return generateMetadataInfo({params: { type: 'music', id: params.id}});
}

export default async function Page({ params }: { params: { type: string, id: string } }) {
  const item = await fetchPost(params.id);
  if(item === null) notFound();
  return (
    <main className="container mx-auto mt-4 px-4">

      <InfoForm id={params.id} item={item} />

      <PlayerContainer id={params.id} item={item} />      

      <RequestSongList type={params.type} id={params.id} />

    </main>
  );
}