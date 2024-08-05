import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { PlayHistory, VideoType } from '../types'

type MusicStore = {
  musicList: VideoType[],
  currentIndex: number,
  currentTime: number,
  playHistory: PlayHistory[],
  setMusicList: (musicList: VideoType[]) => void;
  addMusic: (music: VideoType) => void;
  deleteMusic: (index: number) => void;
  setCurrentIndex: (index: number) => void;
  setCurrentTime: (time: number) => void;
  addPlayHistory: (history: PlayHistory) => void;
};

const useMusicStore = create<MusicStore>()(persist((set) => ({
  musicList: [],
  currentIndex: 0,
  currentTime: 0,
  playHistory: [],
  setMusicList: (musicList) => set({ musicList }),
  deleteMusic: (index) => set((state) => ({
    musicList: state.musicList.filter((music, i) => i !== index),
    currentIndex: index < state.currentIndex ? state.currentIndex-1 : state.currentIndex,
    currentTime: index === state.currentIndex ? 0 : state.currentTime
  })),
  addMusic: (music) => set((state) => ({
    musicList: [...state.musicList, music]
  })),
  setCurrentIndex: (currentIndex) => set({ currentIndex }),
  setCurrentTime: (currentTime) => set({ currentTime }),
  addPlayHistory: (history) => set((state) => ({
    playHistory: [...state.playHistory, history]
  })),
}), {
  name: `musicStore`,
  storage: createJSONStorage(() => localStorage) // 생략시 기본 localStorage
}));

export default useMusicStore;
