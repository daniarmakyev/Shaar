import { FC, useState } from "react";
import searchIcon from "../../assets/images/icons/search.svg";
import voiceIcon from "../../assets/images/icons/voice.svg";
import VoiceListener from "../voiceListener/VoiceListener";
import { useAtom } from "jotai";
import { searchValueAtom } from "../../store/store";

const Search: FC = () => {
  const [searchValue, setSearchValue] = useAtom(searchValueAtom);
  const [isVoiceListening, setIsVoiceListeningAtom] = useState(false);

  return (
    <>
      <div className="container rounded-[40px] border-2 border-[#D9D9D9] absolute top-[32px] left-[50%] translate-x-[-50%] py-[6px] px-[14px] max-w-[702px] w-full flex gap-[14px] justify-between items-center bg-[#F4F4F4] z-[5]">
        <button>
          <img src={searchIcon} alt="search" />
        </button>
        <input
          type="text"
          className="w-full"
          value={searchValue}
          onChange={({ target: { value } }) => setSearchValue(value)}
        />
        <button onClick={() => setIsVoiceListeningAtom(true)}>
          <img src={voiceIcon} alt="voice" />
        </button>
      </div>
      <VoiceListener
        isActive={isVoiceListening}
        close={() => setIsVoiceListeningAtom(false)}
        setSearchValue={(value: string) => setSearchValue(value)}
      />
    </>
  );
};

export default Search;
