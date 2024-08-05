'use client';

import { useEffect, useRef } from 'react';
import parser from 'cron-parser';
import PlayList from './PlayList';
import YouTube, { YouTubeProps, YouTubePlayer } from 'react-youtube';
import { fetchComments } from '@/model/fetch/postFetch';
import { MusicComment, PostComment } from '@/types';
import useMusicStore from '@/zustand/musicStore';
import moment from 'moment';

type Timer = {
  start: string,
  finish: string,
};

export default function Player({ id }: { id: string }){

  const { musicList, setMusicList, currentIndex, setCurrentIndex, currentTime, setCurrentTime, addPlayHistory } = useMusicStore();

  let player: YouTubePlayer = useRef(null);

  useEffect(() => {

    const fetch = async () => {
      const data = await fetchComments(id) as MusicComment[];

      setMusicList(data.map(item => ({
        videoId: item.videoId,
        artist: item.extra?.artist,
        title: item.extra?.title,
        reply_id: item._id,
        comment: {
          user: item.content,
          dj: '',
        }
      })));
    };
    fetch();
  }, []);

  if(musicList.length && currentIndex >= musicList.length){
    setCurrentIndex(0);
  }

  // 플레이어가 재생 준비되면 호출
  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    setTimeout(() => player.current.playVideo(), 1000)
    event.target.playVideo();
    addPlayHistory({
      post_id: id,
      title: musicList[currentIndex].title,
      timestamp: moment().format('YYYY-MM-DD HH:mm:ss')
    });

    player.current = event.target;    
    player.current.removeEventListener('onReady', onPlayerReady);
  };

  // 재생 종료시 호출
  const onEnd: YouTubeProps['onEnd'] = () => {
    // 더이상 재생 목록이 없으면 처음으로 이동
    setCurrentIndex(currentIndex < musicList.length - 1 ? currentIndex + 1 : 0);

    // player.current?.loadVideoById({
    //   videoId: musicList[currentIndex+1].videoId,
    //   startSeconds: 0,
    //   // endSeconds: 15,
    //   suggestedQuality: 'small'
    // });
  };

  const playTime: Timer[] = [
    // {
    //   start: '11 14 * * *',
    //   finish: '12 14 * * *'
    // },
    {
      start: '20 10,11,12 * * *',
      finish: '30 10,11 * * *'
    },
    {
      start: '30 14,15,16,17 * * *',
      finish: '40 13,14,15,16,17 * * *'
    }
  ];

  useEffect(() => { // 타이머 설정
    const now = new Date();
    const startTimer: NodeJS.Timeout[] = [];
    const finishTimer: NodeJS.Timeout[] = [];

    playTime.forEach((time) => {
      const startInterval = parser.parseExpression(time.start);
      const nextStartInvocation = startInterval.next().toDate();
      const startDelay = nextStartInvocation.getTime() - now.getTime();

      console.log(startDelay/1000/60, '분 뒤에 재생')

      startTimer.push(setTimeout(() => {
        console.log('음악 재생');
        player.current.playVideo();
      }, startDelay));

      const finishInterval = parser.parseExpression(time.finish);
      const nextFinishInvocation = finishInterval.next().toDate();
      const finishDelay = nextFinishInvocation.getTime() - now.getTime();

      console.log('finishDelay', finishDelay)

      finishTimer.push(setTimeout(() => {
        console.log('재생 중지');
        player.current?.pauseVideo();
      }, finishDelay));
    });

    // 컴포넌트 언마운트 시 타이머 정리
    return () => {
      startTimer.forEach(timer => clearTimeout(timer));
      finishTimer.forEach(timer => clearTimeout(timer));
    }
  }, []);

  return (
    <>
      { musicList.length && (
        <>
          <PlayList playIndex={currentIndex} videoList={musicList} />

          <YouTube
            videoId={musicList[currentIndex].videoId}
            opts={{
              width: "560",
              height: "315",
              playerVars: {
                // autoplay: 1, //자동재생 O
                rel: 0, //관련 동영상 표시하지 않음 (근데 별로 쓸모 없는듯..)
                modestbranding: 1, // 컨트롤 바에 youtube 로고를 표시하지 않음
              },
            }}
            onReady={ onPlayerReady }
            onEnd={ onEnd }
          />
        </>
      ) }
      <p>자동 재생을 하기 위해서 크롬 설정 &gt; 개인 정보 보호 및 보안 &gt; 사이트 설정 &gt; 추가 콘텐츠 설정 &gt; 소리 &gt; 사이트에서 소리를 재생할 수 있음 체크하고 소리 재생이 허용됨 목록의 추가 버튼 눌러서 접속 주소(예 next-level-two.vercel.app) 등록</p>
    </>
  );
}