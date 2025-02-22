import { FC, Fragment, SetStateAction, useEffect, useState } from "react";
import logoIcon from "../../assets/images/icons/logo.svg";
import { NavLink, useLocation } from "react-router-dom";
import { routes, routes3 } from "../../constants/routes";
import arrow from "../../assets/images/icons/arrow.svg";
import sidebarBg from "../../assets/images/icons/sidebar-bg.svg";
import kgIcon from "../../assets/images/icons/kg.svg";
import ruIcon from "../../assets/images/icons/ru.svg";
import enIcon from "../../assets/images/icons/en.svg";
import home from "../../assets/images/icons/home.svg";
import qrNavbar from "../../assets/images/icons/qrScan.svg";
import mapNavbar from "../../assets/images/icons/map-navbar.svg";
import parkingNav from "../../assets/images/icons/park-navbar.svg";
import { useTranslation } from "react-i18next";
import profileIcon from "../../assets/images/icons/profile2.svg";
import homeSide from "../../assets/images/icons/home-header.svg";
import book from "../../assets/images/icons/bookmark-header.svg";
import notf from "../../assets/images/icons/notf-header.svg";
import calendar from "../../assets/images/icons/calendar-header.svg";
import payment from "../../assets/images/icons/payment-header.svg";
import profile from "../../assets/images/icons/profile-header.svg";
import settings from "../../assets/images/icons/setting-header.svg";
import help from "../../assets/images/icons/help-header.svg";
import logout from "../../assets/images/icons/logout-header.svg";

import events from "../../assets/images/icons/calendar2-header.svg";
import Cookies from "js-cookie";
const Header: FC = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuVisible((prevVisible) => !prevVisible);
  };
  const [selectedImage, setSelectedImage] = useState(ruIcon);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [, forceUpdate] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("i18nextLng") || "ru"
  );

  useEffect(() => {
    if (selectedLanguage === "ru") {
      setSelectedImage(ruIcon);
    } else if (selectedLanguage === "kg") {
      setSelectedImage(kgIcon);
    } else if (selectedLanguage === "en") {
      setSelectedImage(enIcon);
    }
  }, [selectedLanguage]);

  const handleOptionClick = (icon: string, lang: string) => {
    setSelectedImage(icon);
    setSelectedLanguage(lang);
    setIsDropdownOpen(false);
    updateLanguage(lang);
    forceUpdate((prev) => prev + 1);
  };

  const updateLanguage = (lang: string) => {
    localStorage.setItem("i18nextLng", lang);

    document.cookie = `i18next=${lang}; path=/; expires=${getCookieExpiryDate()}`;
  };

  const getCookieExpiryDate = () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    return date.toUTCString();
  };

  const { t } = useTranslation();
  return (
    <header className="py-[16px] bg-green-bg text-white sm:font-comfortaa flex sm:block  ">
      <nav className="container sm:flex justify-between items-center hidden">
        <div className="flex sm:gap-4 md:gap-14 lg:gap-20 items-center flex-grow justify-center sm:ml-0 ml-[150px]">
          <NavLink to="/">
            <img src={logoIcon} alt="logo" className="min-w-24" />
          </NavLink>
          <ul className="flex sm:gap-4 md:gap-5 lg:gap-16 items-center md:flex-wrap flex-wrap lg:flex-nowrap flex-grow justify-center sm:ml-0 md:ml-9 ml-[150px] font-bold">
            {[...routes, ...routes3]
              //@ts-ignore
              .filter((route) => route.label && !route.icon)
              .map(({ label, path }) => {
                return (
                  <li key={path}>
                    <NavLink to={path}>{t(String(label))}</NavLink>
                  </li>
                );
              })}
            <NavLink to={"/calendar"} className={" "}>
              {t("events")}
            </NavLink>
          </ul>
        </div>

        <ul className="flex  capitalize font-bold  ms-auto text-xs md:text-sm  gap-1  max-w-fit justify-end">
          {/* дроп ДАУН */}
          <div className="relativ me-2">
            <img
              src={selectedImage}
              alt="Selected"
              className="cursor-pointer w-10 h-10 min-h-7 min-w-7"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            />
            {isDropdownOpen && (
              <div className="absolute  bg-white border border-gray-300 rounded shadow-md mt-2 w-32 z-10 border-green text-black">
                <div
                  className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleOptionClick(ruIcon, "ru")}
                >
                  <img src={ruIcon} alt="Русский" className="w-6 h-6 mr-2" />
                  <span>Русский</span>
                </div>
                <div
                  className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleOptionClick(kgIcon, "kg")}
                >
                  <img src={kgIcon} alt="Кыргызча" className="w-6 h-6 mr-2" />
                  <span>Кыргызча</span>
                </div>
                <div
                  className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleOptionClick(enIcon, "en")}
                >
                  <img src={enIcon} alt="English" className="w-6 h-6 mr-2" />
                  <span>English</span>
                </div>
              </div>
            )}
          </div>
          {routes
            .filter((route) => route.icon)
            .map(({ path, label, icon }, key) => (
              <section key={path} className="flex flex-wrap ">
                {!!key && (
                  <div className="mx-[8px]  self-stretch bg-white"></div>
                )}
                <li key={path} className="flex gap-[3px] items-center">
                  <img
                    src={icon}
                    alt="nav"
                    className="w-[17px] h-[17px] md:w-[20px] md:h-[20px]"
                  />

                  <NavLink to={path}>{t(String(label))}</NavLink>
                </li>
                <li className="flex gap-[3px] items-center">
                  <img
                    src={profileIcon}
                    alt="nav"
                    className="sm:w-[17px] sm:h-[17px] md:w-[20px] md:h-[20px]"
                  />
                  {Cookies.get("shaar-refresh-token") ? (
                    <NavLink to={"/profile"}>{t("profile")}</NavLink>
                  ) : (
                    <NavLink to={"/login"}>{t("login")}</NavLink>
                  )}
                </li>
              </section>
            ))}
        </ul>
      </nav>

      <div className="max-w-72 sm:hidden absolute">
        <div className="flex justify-between items-start ">
          <button
            onClick={toggleMenu}
            className="p-2 rounded-full hover:bg-gray-800 cursor-pointer"
          >
            <svg
              width="27"
              height="21"
              viewBox="0 0 27 21"
              fill="#fff"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.83337 1.75H25.1667M1.83337 10.5H25.1667M1.83337 19.25H25.1667"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <img
        src={logoIcon}
        alt="logo"
        className="min-w-24 sm:hidden flex ms-auto me-auto"
      />
      <div className="relative me-4 sm:hidden">
        <img
          src={selectedImage}
          alt="Selected"
          className="cursor-pointer w-10 h-10"
          onClick={() => setIsDropdownOpen((prev) => !prev)} // Открываем/закрываем меню
        />

        {/* Выпадающее меню */}
        {isDropdownOpen && (
          <div className="absolute bg-white border border-gray-300 rounded shadow-md mt-2 w-32 z-10 border-green text-black right-0 sm:hidden">
            <div
              className="flex items-center p-2 cursor-pointer hover:bg-gray-100 "
              onClick={() => handleOptionClick(ruIcon, "ru")}
            >
              <img src={ruIcon} alt="Русский" className="w-6 h-6 mr-2" />
              <span>Русский</span>
            </div>
            <div
              className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleOptionClick(kgIcon, "kg")}
            >
              <img src={kgIcon} alt="Кыргызча" className="w-6 h-6 mr-2" />
              <span>Кыргызча</span>
            </div>
            <div
              className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleOptionClick(enIcon, "en")}
            >
              <img src={enIcon} alt="English" className="w-6 h-6 mr-2" />
              <span>English</span>
            </div>
          </div>
        )}
      </div>
      {/* ------------------------------------------------------------------------------------------------------------------ */}
      <div
        style={{
          backgroundImage: `url(${sidebarBg})`,
          backgroundRepeat: "repeat-y",
          backgroundSize: "260px",
          height: "100%",
        }}
        className={` overflow-hidden bg-[#149659]  fixed top-0 left-0 max-w-64 w-full h-screen p-4 flex flex-col bg-gray-900 transform  ${
          menuVisible ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-500 ease-in-out z-50 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900`}
      >
        <div className="flex flex-col justify-between h-full">
          <div className="flex items-center gap-4 mb-5 justify-between z-10">
            <p className="text-[#E5FFF3] text-4xl font-bold"> {t("menu")}</p>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-full hover:bg-gray-800 cursor-pointer"
            >
              <img src={arrow} alt="exit side bar" className="w-6" />
            </button>
          </div>
          <div className="py-4  font-bold text-18 leading-8 z-10">
            <NavLink
              className="flex items-center p-2.5 rounded-lg hover:bg-gray-800 cursor-pointer gap-2.5"
              to={"/"}
            >
              <img src={homeSide} alt="home" />
              {t("home")}
            </NavLink>
            {Cookies.get("shaar-refresh-token") ? (
              <NavLink
                to={"/profile"}
                className="flex items-center p-2.5 rounded-lg hover:bg-gray-800 cursor-pointer gap-2.5"
              >
                <img src={profile} alt="profile" />
                {t("profile")}
              </NavLink>
            ) : (
              <NavLink
                className={
                  "flex items-center p-2.5 rounded-lg hover:bg-gray-800 cursor-pointer gap-2.5"
                }
                to={"/login"}
              >
                <img src={logout} alt="" /> {t("login")}
              </NavLink>
            )}

            <hr className="absolute left-0 border-white z-50 w-[70%]" />
            {/* ----------- */}
            <NavLink
              to={"/"}
              className="flex items-center p-2.5 rounded-lg hover:bg-gray-800 cursor-pointer gap-2.5"
            >
              <img src={book} alt="bookmark" />

              {t("bookmark")}
            </NavLink>
            <NavLink
              to={"/"}
              className="flex items-center p-2.5 rounded-lg hover:bg-gray-800 cursor-pointer gap-2.5"
            >
              <img src={notf} alt="notifications" />

              {t("notifications")}
            </NavLink>
            <NavLink
              to={"/"}
              className="flex items-center p-2.5 rounded-lg hover:bg-gray-800 cursor-pointer gap-2.5"
            >
              <img src={payment} alt="payment" />

              {t("payment")}
            </NavLink>
            <NavLink
              to={"/calendar"}
              className={
                " flex items-center p-2.5 rounded-lg hover:bg-gray-800 cursor-pointer gap-2.5"
              }
            >
              {" "}
              <img src={events} alt="events" />
              {t("events")}
            </NavLink>
            <hr />
            <NavLink
              to={"/"}
              className="flex items-center p-2.5 rounded-lg hover:bg-gray-800 cursor-pointer gap-2.5"
            >
              <img src={settings} alt="settings" />

              {t("settings")}
            </NavLink>
            {/* ----------------------------------------------------------------------------------------------------------------------- */}
            <NavLink
              to={"/"}
              className="flex items-center p-2.5 rounded-lg hover:bg-gray-800 cursor-pointer gap-2.5"
            >
              <img src={help} alt="help" />

              {t("help")}
            </NavLink>
          </div>
          {Cookies.get("shaar-refresh-token") ? (
            <NavLink
            to={"/"}
            className="flex p-2.5 rounded-lg transform  hover:bg-gray-800 cursor-pointer gap-2.5 mt-auto items-center font-bold text-18 leading-8"
          >
            <img src={logout} alt="logout"className="rotate-180" />

            {t("logout")}
          </NavLink>
            ) : (
              <NavLink
              to={"/"}
              className="opacity-0 pointer-events-none flex p-2.5 rounded-lg transform  hover:bg-gray-800 cursor-pointer gap-2.5 mt-auto items-center font-bold text-18 leading-8"
            >
              <img src={logout} alt="logout"className="rotate-180" />
  
              {t("logout")}
            </NavLink>
            )}

        </div>
      </div>

      <nav className="h-20 fixed bottom-0 left-0 w-full bg-white z-20 text-black sm:hidden">
        <div className=" flex  justify-between mx-4 mt-6 ">
          <NavLink to={"/"}>
            <img
              src={home}
              alt="nav icon"
              className={`w-8 ${
                location.pathname === "/" ? "border-b-4 border-[#149659]" : ""
              }`}
            />
          </NavLink>

          <NavLink to={"/"}>
            <img src={qrNavbar} alt="nav icon" className="max-w-9" />
          </NavLink>
          <NavLink to={"/map"}>
            <img
              src={mapNavbar}
              alt="nav icon"
              className={`max-w-9 ${
                location.pathname === "/map"
                  ? "border-b-4 border-[#149659]"
                  : ""
              }`}
            />
          </NavLink>
          <NavLink to={"/parking"}>
            <img
              src={parkingNav}
              alt="nav icon"
              className={`w-9 ${
                location.pathname === "/parking"
                  ? "border-b-4 border-[#149659]"
                  : ""
              }`}
            />
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;
