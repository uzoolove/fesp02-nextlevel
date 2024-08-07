'use client';

import { useEffect, useRef, useState } from 'react';
import parser from 'cron-parser';
import PlayList from './PlayList';
import Speak from "./Speak";
import { YouTubePlayer } from 'react-youtube';
import { fetchComments } from '@/model/fetch/postFetch';
import { MusicComment, MusicType } from '@/types';
import useMusicStore from '@/zustand/musicStore';
import moment from 'moment';
import Player from '@/app/music/[id]/Player';
import { isTimeInRange } from '@/utils/time';
import { getCurrentIndexStorage, getCurrentIndexDJStorage, getCurrentTimeStorage, getCurrentTimeDJStorage, setCurrentIndexStorage, setCurrentIndexDJStorage, setCurrentTimeStorage, setCurrentTimeDJStorage } from '@/utils/storage';
import { useQuery } from '@tanstack/react-query';
import PlayHistory from './PlayHistory';

type Timer = {
  start: string,
  finish: string,
};

const playTime: Timer[] = [
  // {
  //   start: '54 14 * * *',
  //   finish: '55 14 * * *'
  // },
  {
    start: '20 10 * * *',
    finish: '30 10 * * *'
  },
  {
    start: '20 11 * * *',
    finish: '30 11 * * *'
  },
  {
    start: '20 12 * * *',
    finish: '40 13 * * *'
  },
  {
    start: '30 14 * * *',
    finish: '40 14 * * *'
  },
  {
    start: '30 15 * * *',
    finish: '40 15 * * *'
  },
  {
    start: '30 16 * * *',
    finish: '40 16 * * *'
  },
  {
    start: '30 17 * * *',
    finish: '40 17 * * *'
  },
  {
    start: '30 18 * * *',
    finish: '40 18 * * *'
  },
  
  // {
  //   start: '20 10,11,12 * * *',
  //   finish: '30 10,11 * * *'
  // },
  // {
  //   start: '30 14,15,16,17,18 * * *',
  //   finish: '40 13,14,15,16,17,18 * * *'
  // }
];

export default function PlayerContainer({ id, item }: { id: string, item: MusicType }){

  const [player, setPlayer] = useState<YouTubePlayer>();
  const dataRef = useRef<MusicComment[]>([]);

  const playListSource = useRef<'reply' | 'dj'>('reply');

  const { addPlayHistory, setUtterance } = useMusicStore();


  const djChoice = item.videoInfoList || [];
  const { data } = useQuery<MusicComment[], Error, MusicComment[]>({
    queryKey: ['music', id],
    queryFn: () => {
      return fetchComments<MusicComment>(id);
    },
    select: (data) => data.filter(item => item.videoId),
    refetchInterval: 1000*10,
  });

  console.log('data', data);
  // 재생 종료시 다음곡 재생
  useEffect(() => {
    if(player?.g){ // g: iframe 객체(g가 null인 경우도 있어서 추가)
      
      const onStateChange = (event: YT.OnStateChangeEvent) => {
        const state = event.data;
        switch(state){
          case YT.PlayerState.PLAYING: // 1
            startRecordPlayTime();
            break;
          case YT.PlayerState.ENDED: // 0
            if(playListSource.current==='dj'){
              // dj곡 재생중일 경우 dj index 증가
              setCurrentIndexDJStorage(getCurrentIndexDJStorage() + 1);
              setCurrentTimeDJStorage(0);
            }else{
              setCurrentTimeStorage(0);
            }
            
            play(getCurrentIndexStorage() + 1);
            break;
          case YT.PlayerState.PAUSED: // 2
          case YT.PlayerState.BUFFERING: // 3
          default:
            stopRecordPlayTime();
            break;
        }
      }
      
      player.addEventListener('onStateChange', onStateChange);

      // 최초 로딩 시 동영상을 재생하거나 준비상태로 만듬
      // 재생 시간 안에 있을 경우 바로 재생
      if(playTime.some(time => isTimeInRange(time.start, time.finish))){
        play(getCurrentIndexStorage(), getCurrentTimeStorage());
      }else{
        if(data){
          player.cueVideoById({videoId: dataRef.current[getCurrentIndexStorage()]?.videoId || djChoice[getCurrentIndexDJStorage()].videoId,
            startSeconds: getCurrentTimeStorage()
          });
        }
      }

      
      // 컴포넌트 언마운트 시 이벤트 정리
      return () => {
        if(player?.g) player.removeEventListener('onStateChange', onStateChange);
      };

    }
  }, [player]);

  // 등록 시간에 맞춰서 자동 재생/정지
  useEffect(() => {
    const now = new Date();
    const startTimer: NodeJS.Timeout[] = [];
    const finishTimer: NodeJS.Timeout[] = [];

    playTime.forEach((time) => {
      const startInterval = parser.parseExpression(time.start);
      const finishInterval = parser.parseExpression(time.finish);

      const nextStartInvocation = startInterval.next().toDate();
      const startDelay = nextStartInvocation.getTime() - now.getTime();

      startTimer.push(setTimeout(() => {
        console.log('음악 재생', player);
        player?.playVideo();
      }, startDelay));

      console.log(`재생 등록 ${startDelay/1000/60} 분`);
      
      const nextFinishInvocation = finishInterval.next().toDate();
      const finishDelay = nextFinishInvocation.getTime() - now.getTime();
  
      finishTimer.push(setTimeout(() => {
        console.log('재생 중지');
        player?.pauseVideo();
      }, finishDelay));
    });
    
    // 컴포넌트 언마운트 시 타이머 정리
    return () => {
      startTimer.forEach(timer => clearTimeout(timer));
      finishTimer.forEach(timer => clearTimeout(timer));
    };
  }, []);

  

  
  useEffect(() => {
    if(data){
      dataRef.current = data;
    }
  }, [data]);

  let intervalId: NodeJS.Timeout;

  // 노래 재생시간 기록
  const savePlayTime = () => {
    if(player){
      const currentTime = player.getCurrentTime();  // 현재 재생 시간을 초 단위로 반환
      if(djChoice.find(music => music.videoId === player.getVideoData().video_id)){ // DJ 선곡 재생중일 경우
        setCurrentTimeDJStorage(currentTime);
      }else{
        setCurrentTimeStorage(currentTime);
      }
    }
  };

  // 노래 재생시간 기록 시작
  const startRecordPlayTime = () => {
    savePlayTime();
    stopRecordPlayTime();
    intervalId = setInterval(savePlayTime, 1000*5);
  };

  // 노래 재생시간 기록 종료
  const stopRecordPlayTime = () => {
    clearInterval(intervalId);
  };

  // 노래 재생
  const play = (index: number, startSeconds: number = 0, source: 'reply' | 'dj' = 'reply') => {
    console.log('play()', index, startSeconds, dataRef.current);

    if(data && player?.g){
      let nextMusic: MusicComment;

      if(source === 'dj' || index >= dataRef.current.length){ // dj 음악을 선택했거나 더이상 재생 목록이 없으면 DJ 음악 재생
        playListSource.current = 'dj';
        let index = getCurrentIndexDJStorage();
        if(!index  || index >= djChoice.length){
          index = 0;
        }
        nextMusic = djChoice[index];
        setCurrentIndexDJStorage(index);
      }else{
        playListSource.current = 'reply';
        nextMusic = dataRef.current[index];
        setCurrentIndexStorage(index);
      }
 
      console.log('nextMusic', nextMusic);
      player?.pauseVideo();

      // 코멘트 읽기
      const name = nextMusic.user.name;
      const msg = nextMusic.content || nextMusic.content;

      const comment = `${ msg ? name + '님의 사연입니다.' : (name && name + '님의 신청곡입니다.') } ${ msg }`;
      const utterance = {
        text: comment,
        callback: () => {
          player?.loadVideoById({
            videoId: nextMusic.videoId,
            startSeconds,
            suggestedQuality: 'small'
          });
        }
      };
      setUtterance(utterance);
      
      // 히스토리에 추가
      addPlayHistory({
        post_id: id,
        title: nextMusic.extra?.title,
        timestamp: moment().format('YYYY-MM-DD HH:mm:ss')
      });
    }
  };

  return (
    <>
      { data && (
        <>
          <p className='pb-8'>자동 재생 설정: 크롬 설정 &gt; 개인 정보 보호 및 보안 &gt; 사이트 설정 &gt; 추가 콘텐츠 설정 &gt; 소리 &gt; 사이트에서 소리를 재생할 수 있음 체크하고 소리 재생이 허용됨 목록의 추가 버튼 눌러서 접속 주소(예 next-level-two.vercel.app) 등록</p>
          <Player setPlayer={setPlayer} />
          <Speak />
          <PlayList id={id} play={play} djPlayList={djChoice} />
          <PlayHistory />
        </>
      ) }
      
    </>
  );
}