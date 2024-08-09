import { fetchComments } from "@/model/fetch/postFetch";
import { MusicComment } from "@/types";
import { getCurrentIndexDJStorage, getCurrentIndexStorage, setCurrentIndexDJStorage, setCurrentTimeDJStorage } from "@/utils/storage";
import { useQuery } from "@tanstack/react-query";

type Params = {
  id: string,
  play: (index: number, startSeconds: number, source: 'dj' | 'reply') => void,
  djPlayList: MusicComment[],
};

export default function PlayList({ id, play, djPlayList }: Params) {
 
  const { data: userPlayList } = useQuery<MusicComment[], Error, MusicComment[]>({
    queryKey: ['music', id],
    queryFn: () => {
      return fetchComments<MusicComment>(id);
    },
    select: (data) => data.filter(item=>item.videoId),
    refetchInterval: 1000*10
  });

  const playIndex = [getCurrentIndexDJStorage(), getCurrentIndexStorage()];
   
  const handleClick = (source: 'dj' | 'reply', playList: MusicComment[], reply_id: number) => {
    
    const currentIndex = playList.findIndex(music => music._id === reply_id);
    console.log(playList, reply_id, currentIndex);
    if(source === 'dj'){
      setCurrentIndexDJStorage(currentIndex);
      setCurrentTimeDJStorage(0);
    }
    
    play(currentIndex, 0, source);
  };

  return (
    <div className="flex w-full mt-4">
      { [djPlayList, userPlayList].map((playList, index) => (
        <div key={index} className="w-1/2 px-2 mb-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
            <div className="p-4 border-b border-gray-300">
              <h2 className="text-lg font-semibold text-gray-800">{ index===0?'DJ 선곡':'신청곡' }</h2>
            </div>
            <ul className="divide-y divide-gray-300">
              {playList && playList.map((video, i) => (
                video.videoId && (
                  <li key={`${index}-${video._id}`}
                    className={`p-2 flex items-center space-x-2 ${i === playIndex[index] ? 'bg-blue-100' : 'hover:bg-gray-50'} cursor-pointer transition duration-150 ease-in-out`}
                    onClick={() => handleClick(index === 0 ? 'dj' : 'reply', playList, video._id)}
                  >
                    <div className={`w-8 h-8 ${i === playIndex[index] ? 'bg-blue-500' : 'bg-gray-300'} text-white rounded-full flex items-center justify-center flex-shrink-0`}>
                      <span className="text-lg font-semibold">{i + 1}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{video.extra?.title}</p>
                      <p className="text-xs text-gray-600">{video.user?.name}: {video.content}</p>
                    </div>
                  </li>
                )
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>


  );    
}