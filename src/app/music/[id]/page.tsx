import Link from "next/link";
import { Metadata } from "next";

import Player from "./Player";
import RequestSongList from "./RequestSongList";
import Submit from "@/components/Submit";
import Speak from "./Speak";
import { fetchPost } from "@/model/fetch/postFetch";
import { generateMetadata as generateMetadataInfo } from "@/app/(community)/[type]/[id]/page";
import { notFound } from "next/navigation";
import InfoForm from "@/app/(community)/[type]/[id]/InfoForm";
import PlayHistory from "./PlayHistory";
import PlayerMemo from "./PlayerMemo";

export async function generateMetadata({ params }: { params: { type: string, id: string } }): Promise<Metadata | null>{
  return generateMetadataInfo({params: { type: 'music', id: params.id}});
}

export default async function Page({ params }: { params: { type: string, id: string } }) {
  const item = await fetchPost(params.id);
  if(item === null) notFound();
  return (
    <main className="container mx-auto mt-4 px-4">

      <InfoForm id={params.id} type={params.type} item={item} />

      <Speak />

      <PlayHistory />

      {/* <Player id={params.id} /> */}
      <PlayerMemo id={params.id} />

      <RequestSongList type={params.type} id={params.id} />

    </main>
  );
}