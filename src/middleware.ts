import type { NextRequest } from 'next/server';
import { auth } from './auth';

export async function middleware(request: NextRequest) {
  const session = await auth();
  if(!session?.user){
    return Response.redirect(new URL('/login', request.url));
  }
}
 
export const config = {
  matcher: [
    '/(.*)/new', // /info/new, /music/new, ...
  ],
}