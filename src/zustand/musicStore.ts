import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { PlayHistory, MusicType } from '../types'

type MusicStore = {
  playHistory: PlayHistory[],
  utterance: {
    text: string,
    callback?: () => void,
  },
  addPlayHistory: (history: PlayHistory) => void;
  setUtterance: (utterance: { text: string, callback?: () => void }) => void;

  // musicList: MusicType[],
  // currentIndex: number,
  // currentTime: number,
  // djCurrentIndex: number,
  // djCurrentTime: number,
  // voiceName: string,
  // setMusicList: (musicList: MusicType[]) => void;
  // addMusic: (music: MusicType) => void;
  // deleteMusic: (index: number) => void;
  // setCurrentIndex: (index: number) => void;
  // setCurrentTime: (time: number) => void;
  // setDjCurrentIndex: (index: number) => void;
  // setDjCurrentTime: (time: number) => void;
  // setVoiceName: (voiceName: string) => void;
};

const useMusicStore = create<MusicStore>()(persist((set) => ({
  playHistory: [],
  utterance: {
    text: '',
  },
  addPlayHistory: (history) => set((state) => ({
    playHistory: [...state.playHistory, history]
  })),
  setUtterance: (utterance) => set({ utterance }),

  // musicList: [],
  // currentIndex: 0,
  // currentTime: 0,
  // djCurrentIndex: 0,
  // djCurrentTime: 0,
  // voiceName: '',
  // setMusicList: (musicList) => {
  //   return set({ musicList })
  // },
  // deleteMusic: (index) => set((state) => ({
  //   musicList: state.musicList.filter((music, i) => i !== index),
  //   currentIndex: index < state.currentIndex ? state.currentIndex-1 : state.currentIndex,
  //   currentTime: index === state.currentIndex ? 0 : state.currentTime
  // })),
  // addMusic: (music) => set((state) => ({
  //   musicList: [...state.musicList, music]
  // })),
  // setCurrentIndex: (currentIndex) => set({ currentIndex }),
  // setCurrentTime: (currentTime) => set({ currentTime }),
  // setDjCurrentIndex: (djCurrentIndex) => set({ djCurrentIndex }),
  // setDjCurrentTime: (djCurrentTime) => set({ djCurrentTime }),
  // setVoiceName: (voiceName) => set({ voiceName }),
}), {
  name: `musicStore`,
  storage: createJSONStorage(() => localStorage) // 생략시 기본 localStorage
}));

export default useMusicStore;
