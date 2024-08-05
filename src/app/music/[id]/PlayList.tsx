import { VideoType } from "@/types";
import useMusicStore from "@/zustand/musicStore";

export default function PlayList({ playIndex, videoList }: { playIndex: number, videoList: VideoType[] }) {
  const {setCurrentIndex} = useMusicStore();

  const handleClick = (reply_id: number) => {
    console.log(reply_id, '클릭');
    const index = videoList.findIndex(video => video.reply_id === reply_id);
    console.log(index);
    setCurrentIndex(index);
  };
  return (
    <div className="w-full max-w-sm bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <div className="p-4 border-b border-gray-300">
        <h2 className="text-lg font-semibold text-gray-800">플레이 리스트</h2>
      </div>
      <ul className="divide-y divide-gray-300">
        { videoList.map((video, i) => (
          <li key={video.reply_id}
            className={`p-2 flex items-center space-x-2 ${i===playIndex ? 'bg-blue-100' : 'hover:bg-gray-50'} cursor-pointer transition duration-150 ease-in-out`}
            onClick={() => handleClick(video.reply_id)} >
            <div className={`w-8 h-8 ${i===playIndex ? 'bg-blue-500' : 'bg-gray-300'} text-white rounded-full flex items-center justify-center`}>
              <span className="text-lg font-semibold">{i+1}</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">{video.title}</p>
              <p className="text-xs text-gray-600">{video.artist}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );    
}