import { FC, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";

import logoIcon from "../../assets/images/icons/logo.svg";
import arrow from "../../assets/images/icons/arrow.svg";
import sidebarBg from "../../assets/images/icons/sidebar-bg.svg";
import kgIcon from "../../assets/images/icons/kg.svg";
import ruIcon from "../../assets/images/icons/ru.svg";
import enIcon from "../../assets/images/icons/en.png";
import home from "../../assets/images/icons/home.svg";
import qrNavbar from "../../assets/images/icons/qrScan.svg";
import mapNavbar from "../../assets/images/icons/map-navbar.svg";
import parkingNav from "../../assets/images/icons/park-navbar.svg";
import profileIcon from "../../assets/images/icons/profile2.svg";
import homeSide from "../../assets/images/icons/home-header.svg";
import book from "../../assets/images/icons/bookmark-header.svg";
import notf from "../../assets/images/icons/notf-header.svg";
import payment from "../../assets/images/icons/payment-header.svg";
import profile from "../../assets/images/icons/profile-header.svg";
import settings from "../../assets/images/icons/setting-header.svg";
import help from "../../assets/images/icons/help-header.svg";
import logout from "../../assets/images/icons/logout-header.svg";
import events from "../../assets/images/icons/calendar2-header.svg";

import { routes, routes3 } from "../../constants/routes";
import React from "react";

interface LanguageOption {
  icon: string;
  code: string;
  label: string;
}

interface SidebarLinkProps {
  to: string;
  icon: string;
  label: string;
}

const LANGUAGE_OPTIONS: LanguageOption[] = [
  { icon: ruIcon, code: "ru", label: "Русский" },
  { icon: kgIcon, code: "kg", label: "Кыргызча" },
  { icon: enIcon, code: "en", label: "English" },
];

const SIDEBAR_LINKS: SidebarLinkProps[] = [
  { to: "/", icon: homeSide, label: "home" },
  { to: "/", icon: book, label: "bookmark" },
  { to: "/", icon: notf, label: "notifications" },
  { to: "/", icon: payment, label: "payment" },
  { to: "/calendar", icon: events, label: "events" },
  { to: "/", icon: settings, label: "settings" },
  { to: "/", icon: help, label: "help" },
];

const MOBILE_NAV_LINKS = [
  { to: "/", icon: home },
  { to: "/", icon: qrNavbar },
  { to: "/map", icon: mapNavbar },
  { to: "/parking", icon: parkingNav },
];

const LanguageSelector: FC<{
  selectedImage: string;
  isDropdownOpen: boolean;
  toggleDropdown: () => void;
  handleLanguageChange: (icon: string, code: string) => void;
  isMobile?: boolean;
}> = ({
  selectedImage,
  isDropdownOpen,
  toggleDropdown,
  handleLanguageChange,
  isMobile = false,
}) => {
  const dropdownClasses = `absolute bg-white border border-gray-300 rounded shadow-md mt-2 w-32 z-10 border-green text-black ${
    isMobile ? "right-0 " : ""
  }`;
  const mobileHidden = `${isMobile ? "sm:hidden" : ""}`;

  return (
    <div className={`relative ${isMobile ? "me-4" : "me-2"} ${mobileHidden}`}>
      <img
        src={selectedImage}
        alt="Selected Language"
        className={`cursor-pointer ${
          isMobile ? "w-10 h-10" : "w-10 h-10 min-h-7 min-w-7"
        }`}
        onClick={toggleDropdown}
      />
      {isDropdownOpen && (
        <div className={dropdownClasses}>
          {LANGUAGE_OPTIONS.map((option) => (
            <div
              key={option.code}
              className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleLanguageChange(option.icon, option.code)}
            >
              <img
                src={option.icon}
                alt={option.label}
                className="w-6 h-6 mr-2"
              />
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const SidebarLink: FC<SidebarLinkProps> = ({ to, icon, label }) => {
  const { t } = useTranslation();
  return (
    <NavLink
      to={to}
      className="flex items-center p-2.5 rounded-lg hover:bg-gray-800 cursor-pointer gap-2.5"
    >
      <img src={icon} alt={label} />
      {t(label)}
    </NavLink>
  );
};

const Sidebar: FC<{
  visible: boolean;
  onClose: () => void;
}> = ({ visible, onClose }) => {
  const { t } = useTranslation();
  const isLoggedIn = !!Cookies.get("shaar-refresh-token");

  return (
    <div
      style={{
        backgroundImage: `url(${sidebarBg})`,
        backgroundRepeat: "repeat-y",
        backgroundSize: "260px",
        height: "100%",
      }}
      className={`overflow-hidden bg-[#149659] fixed top-0 left-0 max-w-64 w-full h-screen p-4 flex flex-col bg-gray-900 transform ${
        visible ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-500 ease-in-out z-50 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900`}
    >
      <div className="flex flex-col justify-between h-full">
        <div className="flex items-center gap-4 mb-5 justify-between z-10">
          <p className="text-[#E5FFF3] text-4xl font-bold">{t("menu")}</p>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-800 cursor-pointer"
          >
            <img src={arrow} alt="exit side bar" className="w-6" />
          </button>
        </div>

        <div className="py-4 font-bold text-18 leading-8 z-10">
          <SidebarLink to="/" icon={homeSide} label="home" />

          {isLoggedIn ? (
            <SidebarLink to="/profile" icon={profile} label="profile" />
          ) : (
            <SidebarLink to="/login" icon={logout} label="login" />
          )}

          <hr className="absolute left-0 border-white z-50 w-[70%]" />

          {SIDEBAR_LINKS.map((link, index) => (
            <React.Fragment key={index}>
              <SidebarLink to={link.to} icon={link.icon} label={link.label} />
              {index === 4 && <hr />}
            </React.Fragment>
          ))}
        </div>

        {isLoggedIn ? (
          <NavLink
            to="/"
            className="flex p-2.5 rounded-lg transform hover:bg-gray-800 cursor-pointer gap-2.5 mt-auto items-center font-bold text-18 leading-8"
          >
            <img src={logout} alt="logout" className="rotate-180" />
            {t("logout")}
          </NavLink>
        ) : (
          <div className="opacity-0 pointer-events-none flex p-2.5 rounded-lg mt-auto" />
        )}
      </div>
    </div>
  );
};

const MobileNavigation: FC = () => {
  const location = useLocation();

  return (
    <nav className="h-20 fixed bottom-0 left-0 w-full bg-white z-20 text-black sm:hidden">
      <div className="flex justify-between mx-4 mt-6">
        {MOBILE_NAV_LINKS.map((link, index) => (
          <NavLink key={index} to={link.to}>
            <img
              src={link.icon}
              alt="nav icon"
              className={`w-8 ${
                location.pathname === link.to
                  ? "border-b-4 border-[#149659]"
                  : ""
              }`}
            />
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

const Header: FC = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("i18nextLng") || "ru"
  );
  const [selectedImage, setSelectedImage] = useState(ruIcon);
  const [, forceUpdate] = useState(0);

  const { t } = useTranslation();
  const isLoggedIn = !!Cookies.get("shaar-refresh-token");

  useEffect(() => {
    const languageIcon =
      LANGUAGE_OPTIONS.find((opt) => opt.code === selectedLanguage)?.icon ||
      ruIcon;
    setSelectedImage(languageIcon);
  }, [selectedLanguage]);

  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLanguageChange = (icon: string, code: string) => {
    setSelectedImage(icon);
    setSelectedLanguage(code);
    setIsDropdownOpen(false);
    updateLanguage(code);
    forceUpdate((prev) => prev + 1);
    window.location.reload()
  };

  const updateLanguage = (lang: string) => {
    localStorage.setItem("i18nextLng", lang);

    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    document.cookie = `i18next=${lang}; path=/; expires=${date.toUTCString()}`;
  };

  return (
    <header className="py-[16px] bg-green-bg text-white sm:font-comfortaa flex sm:block">
      {/* Desktop Navigation */}
      <nav className="container sm:flex justify-between items-center hidden">
        <div className="flex sm:gap-4 md:gap-14 lg:gap-20 items-center flex-grow justify-center self-center sm:ml-0 ml-[150px]">
          <NavLink to="/">
            <img src={logoIcon} alt="logo" className="min-w-16" />
          </NavLink>

          <ul className="flex sm:gap-4 h-auto md:gap-5 sm:flex-nowrap lg:gap-16 md:flex-nowrap flex-wrap lg:flex-nowrap flex-grow justify-center sm:ml-0 md:ml-2 ml-[150px] font-bold">
            {[...routes, ...routes3]
              .filter((route) => !!route.label && !("icon" in route))
              .map(({ label, path }) => (
                <li key={path} className="h-auto">
                  <NavLink className={"h-fit sm:text-14 text-xs"} to={path}>
                    {t(String(label))}
                  </NavLink>
                </li>
              ))}
            <li>
              {" "}
              <NavLink to="/calendar" className="sm:text-14 text-xs h-fit">
                {t("events")}
              </NavLink>
            </li>
          </ul>
        </div>

        <ul className="flex capitalize font-bold ms-auto  text-xs md:text-sm gap-1 max-w-fit justify-end">
          <LanguageSelector
            selectedImage={selectedImage}
            isDropdownOpen={isDropdownOpen}
            toggleDropdown={toggleDropdown}
            handleLanguageChange={handleLanguageChange}
          />

          {routes
            .filter((route) => route.icon)
            .map(({ path, label, icon }, key) => (
              <section key={path} className="flex flex-wrap lg:flex-nowrap gap-y-4">
                {!!key && (
                  <div className="mx-1 lg:mx-[8px] self-stretch bg-white"></div>
                )}
                <li className="flex gap-[3px] items-center">
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
                  {isLoggedIn ? (
                    <NavLink to="/profile">{t("profile")}</NavLink>
                  ) : (
                    <NavLink to="/login">{t("login")}</NavLink>
                  )}
                </li>
              </section>
            ))}
        </ul>
      </nav>

      {/* Mobile Menu Button */}
      <div className="max-w-72 sm:hidden absolute">
        <div className="flex justify-between items-start">
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

      {/* Mobile Logo */}
      <img
        src={logoIcon}
        alt="logo"
        className="min-w-24 sm:hidden flex ms-auto me-auto"
      />

      {/* Mobile Language Selector */}
      <LanguageSelector
        selectedImage={selectedImage}
        isDropdownOpen={isDropdownOpen}
        toggleDropdown={toggleDropdown}
        handleLanguageChange={handleLanguageChange}
        isMobile={true}
      />

      {/* Sidebar Menu */}
      <Sidebar visible={menuVisible} onClose={toggleMenu} />

      {/* Mobile Bottom Navigation */}
      <MobileNavigation />
    </header>
  );
};

export default Header;
