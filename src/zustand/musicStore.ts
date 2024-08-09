import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { PlayHistory, MusicType } from '../types'

type MusicStore = {
  musicList: MusicType[],
  currentIndex: number,
  currentTime: number,
  djCurrentIndex: number,
  djCurrentTime: number,
  playHistory: PlayHistory[],
  voiceName: string,
  utterance: {
    text: string,
    callback?: () => void,
  },
  setMusicList: (musicList: MusicType[]) => void;
  addMusic: (music: MusicType) => void;
  deleteMusic: (index: number) => void;
  setCurrentIndex: (index: number) => void;
  setCurrentTime: (time: number) => void;
  setDjCurrentIndex: (index: number) => void;
  setDjCurrentTime: (time: number) => void;
  addPlayHistory: (history: PlayHistory) => void;
  setUtterance: (utterance: { text: string, callback?: () => void }) => void;
  setVoiceName: (voiceName: string) => void;
};

const useMusicStore = create<MusicStore>()(persist((set) => ({
  musicList: [],
  currentIndex: 0,
  currentTime: 0,
  djCurrentIndex: 0,
  djCurrentTime: 0,
  playHistory: [],
  voiceName: '',
  utterance: {
    text: '',
  },
  setMusicList: (musicList) => {
    return set({ musicList })
  },
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
  setDjCurrentIndex: (djCurrentIndex) => set({ djCurrentIndex }),
  setDjCurrentTime: (djCurrentTime) => set({ djCurrentTime }),
  addPlayHistory: (history) => set((state) => ({
    playHistory: [...state.playHistory, history]
  })),
  setUtterance: (utterance) => set({ utterance }),
  setVoiceName: (voiceName) => set({ voiceName }),
}), {
  name: `musicStore`,
  storage: createJSONStorage(() => localStorage) // 생략시 기본 localStorage
}));

export default useMusicStore;
