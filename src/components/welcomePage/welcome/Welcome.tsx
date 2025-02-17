import { FC, useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import welcomeSecondImage from "../../../assets/images/welcome2.jpg";
import welcomeFirstImage from "../../../assets/images/welcome1.jpg";
import welcomeFirstMobileImage from "../../../assets/images/welcome1-mobile.png";
import welcomeSecondMobileImage from "../../../assets/images/welcome2-mobile.png";

interface Props {
  isActive: boolean;
}

const images = [welcomeFirstImage, welcomeSecondImage];
const mobileImages = [welcomeFirstMobileImage, welcomeSecondMobileImage];

const Welcome: FC<Props> = ({ isActive }) => {
  const { t } = useTranslation();
  const [stage, setStage] = useState(1);

  return (
    <div
      className={clsx(
        "fixed top-0 bottom-0 left-0 right-0 flex flex-nowrap w-[100vw] justify-center gap-[35px] h-screen overflow-hidden scroll-none pointer-events-none gtbdf:flex-col gtbdf:gap-0",
        { "pointer-events-auto": isActive }
      )}
    >
      {images.map((image, key) => (
        <motion.img
          key={key}
          src={image}
          alt={t("welcome_image_alt")}
          initial={{ x: "-100%" }}
          animate={{ x: isActive && key + 1 === stage ? "0%" : "-100%" }}
          className="absolute left-0 flex-[0_1_841px] sm:h-[100vh] sm:w-[50vw] w-auto object-cover object-center gtbdf:hidden"
        />
      ))}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        className=" relative rounded-[0px_0px_80px_0px] flex-[0_0_50vw] gtbdf:flex-auto gtbdf:bg-green-bg flex justify-center"
      >
        {mobileImages.map((image, key) => (
          <motion.img
            key={key}
            src={image}
            alt={t("welcome_mobile_image_alt")}
            initial={{ y: "-100%" }}
            animate={{ y: isActive && key + 1 === stage ? "0%" : "-120%" }}
            className="absolute top-[10%] max-h-[450px] h-full pb-12 hidden gtbdf:block w-auto z-[50]"
          />
        ))}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: "10%" }}
        animate={{ opacity: isActive ? 1 : 0, y: isActive ? "0%" : "10%" }}
        className="sm:w-[50vw]  flex-auto text-center  gtbdf:flex-initial gtbdf:gap-[56px] gtbdf:bg-green-bg"
      >
        <div className="max-w-[900px] self-center h-[50vh] sm:h-[100vh]  px-3 me-auto pb-40 flex flex-col justify-center gap-10 lg:gap-[56px] gtbdf:rounded-[80px_0px_0px_0px] gtbdf:pt-[42px] gtbdf:px-[18px] gtbdf:bg-white">
          <div className="">
            <h1 className="text-3xl sm:text-3xl md:text-5xl sm:text-left lg:text-6xl font-bold text-green gtbdf:text-[50px]">
              {t("welcome_title")}
            </h1>
            <span className="text-24 sm:text-[28px] sm:text-left md:text-[28px] lg:text-[30px] max-w-[500px] block gtbdf:text-[20px]">
              {t("welcome_message")}
            </span>
          </div>
          <div className=" flex  justify-between gap-20 items-center">
            <div className="flex gap-[11px]">
              {[...new Array(2)].map((_, key) => (
                <div
                  key={key}
                  className={clsx(
                    "border-2 border-green rounded-circle flex-[0_0_26px] h-[26px] animate-def sm:flex-[0_0_17px] gtbdf:h-[17px]",
                    {
                      "flex-[0_0_26px]  !rounded-[30px] lg:!flex-[0_0_105px] bg-green shadow-[1px_1px_8px_black] md:!flex-[0_0_65px]":
                        stage === key + 1,
                    }
                  )}
                ></div>
              ))}
            </div>
            {stage >= 2 ? (
              <Link
                to="/register"
                className="btn bg-green w-36 sm:w-52 p-3 text-2xl"
              >
                {t("get_started")}
              </Link>
            ) : (
              <button
                onClick={() => setStage((prev) => prev + 1)}
                className="btn bg-green w-36 p-3 text-2xl sm:w-52 sm:px-12 sm:py-4"
              >
                {t("next")}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Welcome;
