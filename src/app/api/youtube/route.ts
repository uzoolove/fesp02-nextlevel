import { NextRequest, NextResponse } from "next/server";

// Youtube API 호출
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const videoId = searchParams.get('videoId')
  const res = await fetch(`https://www.googleapis.com/youtube/v3/videos?key=${process.env.GOOGLE_API_KEY}&part=snippet&id=${videoId}`);
  const data = await res.json();
  console.log(data);
  if(data.items.length === 0 ){
    return Response.json({ data: null });
  }
  const result = {
    title: data.items[0].snippet.title,
    thumbnail: data.items[0].snippet.thumbnails.default.url,
  }
  return Response.json({ data: result });
}
