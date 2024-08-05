'use client';

import Button from "@/components/Button";
import { useEffect, useRef, useState } from "react";

export default function Voice() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const comment = '각 팀별로 DB 초기화 방법에 대해서 세시 40분에 수업을 시작하겠습니다. 쉬는 시간이 끝나면 늦지 않게 자리에 앉아주세요.';

  const selectRef = useRef<HTMLSelectElement>(null);

  // client side에서만 실행해야 하는 코드일 경우
  useEffect(() => {
    window.speechSynthesis.onvoiceschanged = () => {
      setVoices(window.speechSynthesis.getVoices().filter(voice => voice.lang === 'ko-KR'));
    };
  }, []);

  const voiceSelect = (
    <select id="voice" ref={selectRef}>
      { voices.map((voice, index) => (
        <option key={index} value={voice.name}>{ voice.name }</option>
      ))}
    </select>
  );

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
    };

    utterThis.onerror = e => {
      console.error("SpeechSynthesisUtterance.onerror", e);
    };

    const selectedVoiceName = selectRef.current?.value;
    const selectedVoice = voices.find(voice => voice.name === selectedVoiceName);
    if(selectedVoice){
      utterThis.voice = selectedVoice
    }

    window.speechSynthesis.speak(utterThis);
  }

  function handleSpeak(e: React.MouseEvent<HTMLButtonElement> ) {
    e.preventDefault();
    speak(comment);
  }

  return (
    <>
      <label htmlFor="voice">DJ 목소리 선택</label><br />
      { voiceSelect }
      <div className="controls">
        <Button onClick={handleSpeak}>Play</Button>
      </div>
    </>    
  );
}