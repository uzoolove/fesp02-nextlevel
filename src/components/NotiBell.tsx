'use client';

import { socket } from "@/utils/websocket";
import { useEffect, useState } from "react";
import { NotiMessageType, NotiRes } from "@/types";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function NotiBell({ userId }: { userId: string }){
  const notify = (msg: string) => toast(msg);
  
  // 서버 접속 상태
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [notiList, setNotiList] = useState<NotiMessageType[]>([]);

  // 새로운 noti 메세지 도착
  const onNotiMessage = (data: NotiRes) => {
    // 추가된 알림 목록을 받아서 보여줌
    setNotiList(data.list);
    if(data.newNoti){
      notify(`${data.newNoti.user.name} ${data.newNoti.content}`);
    }
  }

  // 서버 접속 완료시
  const onConnect = () => {
    socket.emit('setUserId', userId, () => {
      setIsConnected(true);
    });

    socket.on('notification', onNotiMessage);
  }

  const onDisconnect = () => {
    setIsConnected(false);
    socket.off('notification', onNotiMessage);
  }

  useEffect(() => {
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    // 서버 접속
    socket.connect();

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  return (
    <div>
      <svg width="53" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C10.8954 2 10 2.89543 10 4V5.04244C7.17981 5.53018 5 8.04254 5 11V16L3 18V19H21V18L19 16V11C19 8.04254 16.8202 5.53018 14 5.04244V4C14 2.89543 13.1046 2 12 2ZM7 11V16H17V11C17 8.79086 15.2091 7 13 7H11C8.79086 7 7 8.79086 7 11ZM14 21H10C10 22.1046 10.8954 23 12 23C13.1046 23 14 22.1046 14 21Z"
          fill={isConnected?'#00FF00':'#FF4136'}
        />
        <circle cx="20" cy="8" r="8" fill="#F97316" />
        <text x="20" y="11" fontSize="8" fill="#FFFFFF" textAnchor="middle" fontFamily="Arial" fontWeight="bold">
          {notiList.length}
        </text>
      </svg>
      <ToastContainer />
    </div>
  );
}