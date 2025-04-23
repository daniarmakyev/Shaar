import { FC } from "react";
import { motion } from "framer-motion";
import backgroundImage from "../../../assets/images/background.jpg";
import kgIcon from "../../../assets/images/icons/kg.svg";
import ruIcon from "../../../assets/images/icons/ru.svg";
import enIcon from "../../../assets/images/icons/en.png";
import { LanguageType } from "../../../types/client.types";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

const languages: { label: string; value: LanguageType; icon: string }[] = [
  { label: "Кыргыз тили", value: "kg", icon: kgIcon },
  { label: "Русский язык", value: "ru", icon: ruIcon },
  { label: "English language", value: "en", icon: enIcon },
];

interface Props {
  isActive: boolean;
  setLanguageSetted: () => void;
}

const Languages: FC<Props> = ({ isActive, setLanguageSetted }) => {
  const { i18n } = useTranslation();

  const changeLanguage = (language: LanguageType) => {
    i18n.changeLanguage(language);
    setLanguageSetted();
  };

  return (
    <motion.div
      className={clsx(
        "relative min-h-screen bg-cover text-white flex justify-center items-center flex-col pointer-events-none",
        { "pointer-events-auto": isActive }
      )}
      style={{ backgroundImage: `url(${backgroundImage})` }}
      animate={{ opacity: isActive ? 1 : 0 }}
    >
      <motion.h2
        animate={{
          opacity: [0, 1, 1, 1],
          y: [150, 0, 0, -340],
          fontSize: ["128px", "128px", "128px", "64px"],
        }}
        transition={{
          duration: 2,
          times: [0, 0.7],
          ease: "anticipate",
        }}
        className="absolute font-bold [text-shadow:_1px_1px_9px_rgba(0,0,0,0.5)] btbdf:!text-[30px]"
      >
        Hello!
      </motion.h2>
      <motion.div
        className="container"
        initial={{ opacity: 0, y: "50%" }}
        animate={{ opacity: 1, y: "0%" }}
        transition={{ delay: 1.65, duration: 0.3 }}
      >
        <h2 className="text-[40px] sm:text-[50px] md:text-[66px] font-bold [text-shadow:_1px_1px_9px_rgba(0,0,0,0.5)] text-center">
          Choose a language
        </h2>
        <div className="mt-90 flex flex-wrap justify-center gap-x-[95px] gap-y-[78px] btbdf:flex-col btbdf:items-center btbdf:gap-y-[23px]">
          {languages.map(({ label, value, icon }) => (
            <button
              key={value}
              onClick={() => changeLanguage(value)}
              className="border-[5px] border-transparent rounded-[53px] py-[11px] px-[13px] max-w-[570px] flex-auto flex justify-between items-center bg-white text-green font-bold font-montserrat text-[36px] uppercase animate-def hover:translate-y-[-10px] clickable hover:border-green btbdf:rounded-[37px] btbdf:w-full btbdf:p-[3px] btbdf:gap-[10px] btbdf:max-w-[370px] btbdf:h-[76px] btbdf:border-2 btbdf:text-[24px]"
            >
              <img
                src={icon}
                alt="kg"
                className="w-[127px] h-[117px] btbdf:w-[70px] btbdf:h-[70px]"
              />
              <span className="block mx-auto sm:text-xl md:text-2xl lg:text-3xl text-xl md:text-">{label}</span>
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Languages;
