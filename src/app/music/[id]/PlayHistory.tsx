'use client';

import useMusicStore from "@/zustand/musicStore";

export default function PlayHistory() {

  // 렌더링 최적화를 위해서 수동으로 필요한 속성만 반환받아서 사용
  const playHistory = useMusicStore(state => state.playHistory);

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg mb-4">
      <h1 className="text-lg font-bold mb-4 text-gray-800">재생 내역</h1>
      <ul className="space-y-4">
        {playHistory.map((item, index) => (
          <li key={index} className="flex items-center p-4 bg-gray-50 rounded-lg shadow-sm">
            <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-600">
              <span className="text-xl">🎵</span>
            </div>
            <div className="ml-4">
              <h2 className="text-sm text-gray-800">{item.title}</h2>
              <p className="text-gray-400 text-sm">{item.timestamp}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};