'use client';

import useMusicStore from "@/zustand/musicStore";
import { useEffect, useRef, useState } from "react";

export default function Voice() {
  const utterance = useMusicStore((state) => state.utterance);
  const voiceName = useMusicStore((state) => state.voiceName);
  const setVoiceName = useMusicStore((state) => state.setVoiceName);

  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);

  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  const selectRef = useRef<HTMLSelectElement>(null);

  // client side에서만 실행해야 하는 코드일 경우
  useEffect(() => {
    window.speechSynthesis.onvoiceschanged = () => {
      setVoices(window.speechSynthesis.getVoices().filter(voice => voice.lang === 'ko-KR'));
    };
  }, []);

  const handleChangeVoice = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setVoiceName(event.target.value);
  };

  const voiceSelect = (
    <select id="voice" ref={selectRef} value={voiceName} onChange={handleChangeVoice}>
      { voices.map((voice, index) => (
        <option key={index} value={voice.name}>{ voice.name }</option>
      ))}
    </select>
  );

  useEffect(() => {
    if(utterance){
      if(isVoiceEnabled){
        speak(utterance.text);
      }else{
        utterance.callback && utterance.callback();
      }
    }
  }, [utterance, voices]);

  
  
  function speak(text: string){
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
  
    const utterThis = new SpeechSynthesisUtterance(text);

    utterThis.onstart = e => {
      console.log("SpeechSynthesisUtterance.onstart");
    };

    utterThis.onend = e => {
      console.log("SpeechSynthesisUtterance.onend");
      utterance.callback && utterance.callback();
    };

    utterThis.onerror = e => {
      console.error("SpeechSynthesisUtterance.onerror", e);
    };

    const selectedVoice = voices.find(voice => voice.name === voiceName);

    if(selectedVoice){
      utterThis.voice = selectedVoice;
      window.speechSynthesis.speak(utterThis);
    }
  }

  return (
    <div className="p-4 bg-white">
      <div className="mb-6 flex items-center">
        <input
          type="checkbox"
          id="enableVoice"
          checked={isVoiceEnabled}
          onChange={(event) => setIsVoiceEnabled(event.target.checked)}
          className="h-6 w-6 text-blue-500 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label htmlFor="enableVoice" className="ml-3 text-lg font-semibold text-gray-700">
          DJ 멘트 듣기
        </label>
      </div>
      {isVoiceEnabled && (
        <div className="mb-6">
          <label htmlFor="voice" className="block text-lg font-semibold text-gray-700 mb-2">
            DJ 목소리 선택
          </label>
          {voiceSelect}
        </div>
      )}
    </div>
  );
}