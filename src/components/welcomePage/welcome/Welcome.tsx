import { FC, useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { Link } from "react-router-dom";
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
  const [stage, setStage] = useState(1);

  return (
    <div
      className={clsx(
        "fixed top-0 bottom-0 left-0 right-0 flex justify-center gap-[54px] h-screen overflow-hidden scroll-none pointer-events-none gtbdf:flex-col gtbdf:gap-0",
        { "pointer-events-auto": isActive }
      )}
    >
      {images.map((image, key) => (
        <motion.img
          key={image}
          src={image}
          alt="welcome-first"
          initial={{ x: "-100%" }}
          animate={{ x: isActive && key + 1 === stage ? "0%" : "-100%" }}
          className="absolute left-0 flex-[0_1_841px] h-screen object-contain object-left gtbdf:hidden"
        />
      ))}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        className="relative rounded-[0px_0px_80px_0px] flex-[0_1_841px] gtbdf:flex-auto gtbdf:bg-green-bg flex justify-center"
      >
        {mobileImages.map((image, key) => (
          <motion.img
            src={image}
            alt="welcome-mobile"
            initial={{ y: "-100%" }}
            animate={{ y: isActive && key + 1 === stage ? "0%" : "-100%" }}
            className="absolute top-[0px] max-w-[350px] w-full hidden gtbdf:block tbdf:max-w-[300px] z-[50]"
          />
        ))}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: "10%" }}
        animate={{ opacity: isActive ? 1 : 0, y: isActive ? "0%" : "10%" }}
        className="flex-auto text-center  gtbdf:flex-initial gtbdf:gap-[56px] gtbdf:bg-green-bg"
      >
        <div className="pt-[208px] pr-40 pb-40 flex flex-col justify-between gap-[56px] gtbdf:rounded-[80px_0px_0px_0px] gtbdf:pt-[42px] gtbdf:px-[18px] gtbdf:bg-white">
          <div>
            <h1 className="text-[96px] font-bold text-green gtbdf:text-[50px]">
              Welcome
            </h1>
            <span className="mx-auto text-[40px] max-w-[500px] block gtbdf:text-[20px]">
              Let's start our journey around the city together!
            </span>
          </div>
          <div className="mx-auto flex max-w-[477px] w-full justify-between items-center">
            <div className="flex gap-[11px]">
              {[...new Array(2)].map((_, key) => (
                <div
                  key={key}
                  className={clsx(
                    "border-2 border-green rounded-circle flex-[0_0_26px] h-[26px] animate-def gtbdf:flex-[0_0_17px] gtbdf:h-[17px]",
                    {
                      "!rounded-[30px] !flex-[0_0_105px] bg-green shadow-[1px_1px_8px_black] gtbdf:!flex-[0_0_65px]":
                        stage === key + 1,
                    }
                  )}
                ></div>
              ))}
            </div>
            {stage >= 2 ? (
              <Link to="/register" className="btn bg-green">
                Get started
              </Link>
            ) : (
              <button
                onClick={() => setStage((prev) => prev + 1)}
                className="btn bg-green"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Welcome;
