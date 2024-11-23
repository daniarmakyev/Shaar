import { FC, useEffect, useState } from "react";
import voiceIcon from "../../assets/images/icons/voice.svg";

interface Props {
  isActive: boolean;
  close: () => void;
  setSearchValue: (value: string) => void;
}

const VoiceListener: FC<Props> = ({ isActive, close, setSearchValue }) => {
  const [text, setText] = useState("");
  const [_, setIsListening] = useState(false);

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    return <p>Ваш браузер не поддерживает голосовой ввод.</p>;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "ru-RU";
  recognition.interimResults = false;

  const startListening = () => {
    setIsListening(true);
    recognition.start();
  };

  const stopListening = () => {
    setIsListening(false);
    recognition.stop();
  };

  recognition.onresult = (event) => {
    const result = event.results[0][0].transcript;
    setText(result);
    setSearchValue(result);
    setIsListening(false);
    close();
  };

  recognition.onerror = (event) => {
    console.error("Ошибка распознавания:", event.error);
    setIsListening(false);
  };

  useEffect(() => {
    isActive && startListening();
  }, [isActive]);

  if (!isActive) return;
  return (
    <div
      onClick={() => close()}
      className="fixed top-0 left-0 w-full h-screen bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-[200]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="rounded-[12px] w-[800px] h-[600px] bg-white flex flex-col justify-center items-center"
      >
        <button onClick={() => stopListening()}>
          <img src={voiceIcon} alt="" className="w-[200px] h-[200px]" />
        </button>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default VoiceListener;
