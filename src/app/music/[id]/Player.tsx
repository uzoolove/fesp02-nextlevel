'use client';

import React from 'react';
import YouTube, { YouTubePlayer } from 'react-youtube';

const Player = React.memo(function MemoizationPlayer ({ setPlayer }: { setPlayer: (player: YouTubePlayer)=>void }) {
  return (
    <YouTube
      opts={{
        width: "1020",
        // height: "315",
        playerVars: {
          // autoplay: 1, //자동재생
          modestbranding: 1, // YouTube 로고를 최소화
          rel: 0, // 관련 동영상 표시하지 않기
          showinfo: 0 // 비디오 정보 숨기기
        },
      }}
      onReady={ (event: YT.PlayerEvent) => {
        setPlayer(event.target);
      } }
    />
  );
});

export default Player;
