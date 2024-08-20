import { ClientToServerEvents, ServerToClientEvents } from "@/types/chatting";
import { io, Socket } from "socket.io-client";

const URL = `${process.env.NEXT_PUBLIC_API_SERVER}/${process.env.NEXT_PUBLIC_API_SERVER_CLIENT_ID}`;
console.log(URL)
export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(URL, {
  autoConnect: false
});

