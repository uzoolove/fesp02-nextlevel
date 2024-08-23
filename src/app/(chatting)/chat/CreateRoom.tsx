'use client';

import { MsgItem, RoomsData } from "@/types";
import { socket } from "@/utils/websocket";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CreateRoom(){
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [roomName, setRoomName] = useState('');

  const [rooms, setRooms] = useState<RoomsData>({});

  const {data: session, status} = useSession();

  useEffect(() => {
    function onConnect() {
      console.log('서버 접속됨.');
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onSetMsg(data: MsgItem){
      console.log(data);
    }


    // 서버 접속 완료
    socket.on('connect', onConnect);
    // 서버 접속 해제
    socket.on('disconnect', onDisconnect);
    // 채팅방 목록 변경
    socket.on('setRooms', setRooms);
    // 채팅 메세지 도착
    socket.on('setMsg', onSetMsg);

    // 서버 접속
    socket.connect();
    // 채팅방 목록 조회
    socket.emit('getRooms', (rooms: RoomsData) => setRooms(rooms));

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('setRooms', setRooms);
      socket.off('setMsg', onSetMsg);
    };
  }, []);

  // 채팅방 생성
  const handleCreateRoom = function(){
    if(session?.user){
      if(roomName.trim().length > 0){
        const createInfo = { user_id: Number(session.user.id), hostName: session.user.name || '익명', roomName: roomName };
        console.log(createInfo);
        socket.emit('createRoom', createInfo);
      }else{
        alert('채팅방 이름을 입력하세요.'); 
      }
    }else{
      alert('로그인 후에 이용하세요.');
    }
  };

  return (
    <div>
      <p>연결 상태: { '' + isConnected }</p>
      <h3>채팅방 목록</h3>
      <ul>
        {
          Object.keys(rooms).map((key, index) =>
            <li key={ index }>{ rooms[key].roomName }({ rooms[key].hostName })<Link href={`/chat/${key}`}>참여</Link></li>
          )
        }
      </ul>
      이름 <input type="text" autoFocus={true} onChange={ e => setRoomName(e.target.value) } value={roomName} />
      <button onClick={ handleCreateRoom } >생성</button>

    </div>
  );
}