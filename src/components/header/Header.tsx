import { FC, Fragment, SetStateAction, useState } from "react";
import logoIcon from "../../assets/images/icons/logo.svg";
import { Link, NavLink, useLocation } from "react-router-dom";
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

const Header: FC = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuVisible((prevVisible) => !prevVisible);
  };
  const [selectedImage, setSelectedImage] = useState(ruIcon); // Начальная иконка
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Состояние открытия списка

  const handleOptionClick = (icon: SetStateAction<string>) => {
    setSelectedImage(icon); // Меняем иконку
    setIsDropdownOpen(false); // Закрываем меню
  };

  return (
    <header className="py-[16px] bg-green-bg text-white sm:font-comfortaa flex sm:block">
      <nav className="container sm:flex justify-between items-center hidden">
        <div className="flex sm:gap-4 md:gap-14 lg:gap-20 items-center flex-grow justify-center sm:ml-0 ml-[150px]">
          <Link to="/">
            <img src={logoIcon} alt="logo" className="min-w-24" />
          </Link>
          <ul className="flex sm:gap-4 md:gap-14 lg:gap-20 items-center flex-grow justify-center sm:ml-0 ml-[150px] font-bold">
            {[...routes, ...routes3]
              //@ts-ignore
              .filter((route) => route.label && !route.icon)
              .map(({ label, path }) => (
                <li key={path}>
                  <NavLink to={path}>{label}</NavLink>
                </li>
              ))}
          </ul>
        </div>

        <ul className="flex items-center capitalize font-bold  ml-auto ">
          {/* дроп ДАУН */}
          <div className="relativ me-4">
            <img
              src={selectedImage}
              alt="Selected"
              className="cursor-pointer w-10 h-10"
              onClick={() => setIsDropdownOpen((prev) => !prev)} // Открываем/закрываем меню
            />

            {/* Выпадающее меню */}
            {isDropdownOpen && (
              <div className="absolute bg-white border border-gray-300 rounded shadow-md mt-2 w-32 z-10 border-green text-black">
                <div
                  className="flex items-center p-2 cursor-pointer hover:bg-gray-100 "
                  onClick={() => handleOptionClick(ruIcon)}
                >
                  <img src={ruIcon} alt="Русский" className="w-6 h-6 mr-2" />
                  <span>Русский</span>
                </div>
                <div
                  className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleOptionClick(kgIcon)}
                >
                  <img src={kgIcon} alt="Кыргызча" className="w-6 h-6 mr-2" />
                  <span>Кыргызча</span>
                </div>
                <div
                  className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleOptionClick(enIcon)}
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
              <Fragment key={path}>
                {!!key && (
                  <div className="mx-[14px] flex-[0_0_1px] self-stretch bg-white"></div>
                )}
                <li key={path} className="flex gap-[3px] items-center">
                  <img src={icon} alt="nav" className="w-[26px] h-[26px]" />
                  <Link to={path}>{label}</Link>
                  <Link to={"/calendar"}>{"Events"}</Link>
                </li>
              </Fragment>
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
              onClick={() => handleOptionClick(ruIcon)}
            >
              <img src={ruIcon} alt="Русский" className="w-6 h-6 mr-2" />
              <span>Русский</span>
            </div>
            <div
              className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleOptionClick(kgIcon)}
            >
              <img src={kgIcon} alt="Кыргызча" className="w-6 h-6 mr-2" />
              <span>Кыргызча</span>
            </div>
            <div
              className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleOptionClick(enIcon)}
            >
              <img src={enIcon} alt="English" className="w-6 h-6 mr-2" />
              <span>English</span>
            </div>
          </div>
        )}
      </div>
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
            <p className="text-[#E5FFF3] text-4xl font-bold">Menu</p>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-full hover:bg-gray-800 cursor-pointer"
            >
              <img src={arrow} alt="exit side bar" className="w-6" />
            </button>
          </div>
          <div className="py-4  font-bold text-18 leading-8 z-10">
            <Link
              className="flex items-center p-2.5 rounded-lg hover:bg-gray-800 cursor-pointer gap-2.5"
              to={"/"}
            >
              <svg
                width="25"
                height="27"
                viewBox="0 0 25 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="max-w-6"
              >
                <path
                  d="M23.3333 23.6078V10.5763C23.3333 10.3383 23.2806 10.1035 23.1794 9.89063C23.0781 9.67775 22.9311 9.49257 22.75 9.34976L12.5417 1.30089C12.2892 1.10185 11.9822 0.994263 11.6667 0.994263C11.3511 0.994263 11.0441 1.10185 10.7917 1.30089L0.583333 9.34976C0.402214 9.49257 0.255209 9.67775 0.15396 9.89063C0.0527114 10.1035 0 10.3383 0 10.5763V23.6078C0 24.0144 0.153646 24.4043 0.427136 24.6919C0.700627 24.9794 1.07156 25.1409 1.45833 25.1409H7.29167C7.67844 25.1409 8.04937 24.9794 8.32286 24.6919C8.59635 24.4043 8.75 24.0144 8.75 23.6078V19.0084C8.75 18.6018 8.90365 18.2119 9.17714 17.9243C9.45063 17.6368 9.82156 17.4753 10.2083 17.4753H13.125C13.5118 17.4753 13.8827 17.6368 14.1562 17.9243C14.4297 18.2119 14.5833 18.6018 14.5833 19.0084V23.6078C14.5833 24.0144 14.737 24.4043 15.0105 24.6919C15.284 24.9794 15.6549 25.1409 16.0417 25.1409H21.875C22.2618 25.1409 22.6327 24.9794 22.9062 24.6919C23.1797 24.4043 23.3333 24.0144 23.3333 23.6078Z"
                  fill="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Home
            </Link>
            <Link
              to={"/"}
              className="flex items-center p-2.5 rounded-lg hover:bg-gray-800 cursor-pointer gap-2.5"
            >
              <svg
                width="27"
                height="29"
                viewBox="0 0 27 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="max-w-6"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.66667 6.88885C7.66667 5.23861 8.28125 3.65597 9.37521 2.48907C10.4692 1.32218 11.9529 0.666626 13.5 0.666626C15.0471 0.666626 16.5308 1.32218 17.6248 2.48907C18.7188 3.65597 19.3333 5.23861 19.3333 6.88885C19.3333 8.53908 18.7188 10.1217 17.6248 11.2886C16.5308 12.4555 15.0471 13.1111 13.5 13.1111C11.9529 13.1111 10.4692 12.4555 9.37521 11.2886C8.28125 10.1217 7.66667 8.53908 7.66667 6.88885ZM7.66667 16.2222C5.7328 16.2222 3.87813 17.0416 2.51068 18.5002C1.14323 19.9589 0.375 21.9372 0.375 24C0.375 25.2376 0.835936 26.4246 1.65641 27.2998C2.47688 28.175 3.58968 28.6666 4.75 28.6666H22.25C23.4103 28.6666 24.5231 28.175 25.3436 27.2998C26.1641 26.4246 26.625 25.2376 26.625 24C26.625 21.9372 25.8568 19.9589 24.4893 18.5002C23.1219 17.0416 21.2672 16.2222 19.3333 16.2222H7.66667Z"
                  fill="#ECE8E8"
                />
              </svg>
              Profile
            </Link>
            <hr className="absolute left-0 border-white z-50 w-[70%]" />
            {/* ----------- */}
            <Link
              to={"/"}
              className="flex items-center p-2.5 rounded-lg hover:bg-gray-800 cursor-pointer gap-2.5"
            >
              <svg
                width="25"
                height="33"
                viewBox="0 0 25 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="max-w-6"
              >
                <path
                  d="M0.833374 5.29163C0.833374 4.1313 1.29431 3.01851 2.11478 2.19803C2.93525 1.37756 4.04805 0.916626 5.20837 0.916626H19.7917C20.952 0.916626 22.0648 1.37756 22.8853 2.19803C23.7058 3.01851 24.1667 4.1313 24.1667 5.29163V28.6658C24.1667 30.445 22.1542 31.4804 20.7075 30.4464L12.5 24.5839L4.29254 30.4464C2.84442 31.4818 0.833374 30.4464 0.833374 28.6673V5.29163Z"
                  fill="#ECE8E8"
                />
              </svg>
              Bookmark
            </Link>
            <Link
              to={"/"}
              className="flex items-center p-2.5 rounded-lg hover:bg-gray-800 cursor-pointer gap-2.5"
            >
              <svg
                width="27"
                height="33"
                viewBox="0 0 27 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="max-w-6"
              >
                <path
                  d="M13.5 0.822876C13.1381 0.822771 12.7803 0.899648 12.4503 1.0484C12.1204 1.19716 11.8259 1.41439 11.5863 1.68567C11.3467 1.95696 11.1676 2.2761 11.0608 2.62191C10.954 2.96772 10.922 3.33229 10.9669 3.69142C8.7708 4.25395 6.82444 5.53148 5.43474 7.32255C4.04503 9.11361 3.29104 11.3163 3.29167 13.5833V23.7916H1.83333C1.44656 23.7916 1.07563 23.9453 0.802136 24.2188C0.528645 24.4923 0.375 24.8632 0.375 25.25C0.375 25.6367 0.528645 26.0077 0.802136 26.2812C1.07563 26.5546 1.44656 26.7083 1.83333 26.7083H25.1667C25.5534 26.7083 25.9244 26.5546 26.1979 26.2812C26.4714 26.0077 26.625 25.6367 26.625 25.25C26.625 24.8632 26.4714 24.4923 26.1979 24.2188C25.9244 23.9453 25.5534 23.7916 25.1667 23.7916H23.7083V13.5833C23.709 11.3163 22.955 9.11361 21.5653 7.32255C20.1756 5.53148 18.2292 4.25395 16.0331 3.69142C16.0448 3.58836 16.0511 3.48288 16.0521 3.37496C16.0521 2.6981 15.7832 2.04897 15.3046 1.57036C14.826 1.09176 14.1769 0.822876 13.5 0.822876ZM13.5 32.5416C12.3397 32.5416 11.2269 32.0807 10.4064 31.2602C9.58594 30.4397 9.125 29.3269 9.125 28.1666H17.875C17.875 29.3269 17.4141 30.4397 16.5936 31.2602C15.7731 32.0807 14.6603 32.5416 13.5 32.5416Z"
                  fill="#ECE8E8"
                />
              </svg>
              Notifications
            </Link>
            <Link className="flex ms-3 gap-2" to={"/calendar"}>
              <svg
                width="25"
                height="30"
                viewBox="0 0 30 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 8.66671V5.33337H3.33333V3.66671C3.33333 2.78265 3.68452 1.93481 4.30964 1.30968C4.93476 0.684563 5.78261 0.333374 6.66667 0.333374H16.6667V12L20.8333 9.50004L25 12V0.333374H26.6667C28.4167 0.333374 30 1.91671 30 3.66671V30.3334C30 32.0834 28.4167 33.6667 26.6667 33.6667H6.66667C4.91667 33.6667 3.33333 32.0834 3.33333 30.3334V28.6667H0V25.3334H3.33333V18.6667H0V15.3334H3.33333V8.66671H0ZM6.66667 15.3334H3.33333V18.6667H6.66667V15.3334ZM6.66667 8.66671V5.33337H3.33333V8.66671H6.66667ZM6.66667 28.6667V25.3334H3.33333V28.6667H6.66667Z"
                  fill="#F0FFF8"
                />
              </svg>Calendar
            </Link>
            <Link
              to={"/"}
              className="flex items-center p-2.5 rounded-lg hover:bg-gray-800 cursor-pointer gap-2.5"
            >
              <svg
                width="31"
                height="25"
                viewBox="0 0 31 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="max-w-6"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.29163 0.833374C4.1313 0.833374 3.01851 1.29431 2.19803 2.11478C1.37756 2.93525 0.916626 4.04805 0.916626 5.20837V6.66671H30.0833V5.20837C30.0833 4.04805 29.6224 2.93525 28.8019 2.11478C27.9814 1.29431 26.8686 0.833374 25.7083 0.833374H5.29163ZM30.0833 9.58337H0.916626V19.7917C0.916626 20.952 1.37756 22.0648 2.19803 22.8853C3.01851 23.7058 4.1313 24.1667 5.29163 24.1667H25.7083C26.8686 24.1667 27.9814 23.7058 28.8019 22.8853C29.6224 22.0648 30.0833 20.952 30.0833 19.7917V9.58337ZM9.66663 16.875C9.66663 16.4883 9.82027 16.1173 10.0938 15.8438C10.3673 15.5704 10.7382 15.4167 11.125 15.4167H17.562L17.3856 15.2402C17.1119 14.9668 16.9581 14.5958 16.958 14.209C16.9579 13.8221 17.1114 13.4511 17.3849 13.1774C17.6583 12.9038 18.0293 12.75 18.4161 12.7498C18.803 12.7497 19.174 12.9033 19.4477 13.1767L22.1135 15.844C22.3869 16.1175 22.5405 16.4883 22.5405 16.875C22.5405 17.2617 22.3869 17.6326 22.1135 17.9061L19.4477 20.5719C19.3131 20.7112 19.1522 20.8223 18.9743 20.8987C18.7964 20.9752 18.605 21.0154 18.4114 21.0171C18.2177 21.0188 18.0257 20.9819 17.8465 20.9085C17.6673 20.8352 17.5044 20.7269 17.3675 20.59C17.2306 20.4531 17.1223 20.2902 17.049 20.111C16.9756 19.9318 16.9387 19.7398 16.9404 19.5461C16.9421 19.3525 16.9823 19.1611 17.0588 18.9832C17.1352 18.8053 17.2463 18.6444 17.3856 18.5098L17.562 18.3334H11.125C10.7382 18.3334 10.3673 18.1797 10.0938 17.9062C9.82027 17.6327 9.66663 17.2618 9.66663 16.875Z"
                  fill="#ECE8E8"
                />
              </svg>
              Payment
            </Link>

            <hr />
            <Link
              to={"/"}
              className="flex items-center p-2.5 rounded-lg hover:bg-gray-800 cursor-pointer gap-2.5"
            >
              <svg
                width="31"
                height="29"
                viewBox="0 0 31 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="max-w-6"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.5323 1.09643C12.2419 0.883879 11.9037 0.745755 11.5476 0.694146C11.1914 0.642536 10.828 0.679014 10.4892 0.800387C8.90497 1.38104 7.43356 2.23221 6.14041 3.31601C5.86647 3.5486 5.65361 3.84469 5.52041 4.17846C5.38721 4.51222 5.33771 4.87351 5.37625 5.2308C5.48562 6.32893 5.29166 7.38914 4.76375 8.30205C4.23729 9.21643 3.41479 9.91497 2.40854 10.3685C2.07939 10.5142 1.79096 10.7383 1.5685 11.0213C1.34604 11.3042 1.19634 11.6374 1.1325 11.9916C0.842716 13.6513 0.842716 15.3486 1.1325 17.0083C1.26812 17.7914 1.80333 18.3587 2.40854 18.6329C3.41479 19.085 4.23729 19.785 4.76521 20.6979C5.29166 21.6123 5.48562 22.671 5.37625 23.7691C5.31062 24.4283 5.53229 25.175 6.14041 25.6839C7.43356 26.7677 8.90497 27.6189 10.4892 28.1996C10.8278 28.3207 11.1909 28.357 11.5468 28.3054C11.9027 28.2538 12.2406 28.1158 12.5308 27.9035C13.4277 27.2589 14.4442 26.8958 15.5 26.8958C16.5558 26.8958 17.5708 27.2589 18.4677 27.9035C19.0073 28.2914 19.7656 28.4723 20.5108 28.1996C22.095 27.6189 23.5664 26.7677 24.8596 25.6839C25.4677 25.175 25.6908 24.4298 25.6237 23.7691C25.5144 22.671 25.7069 21.6108 26.2362 20.6979C26.7627 19.7835 27.5852 19.0864 28.5915 18.6329C29.1952 18.3602 29.7319 17.7914 29.8675 17.0083C30.1573 15.3486 30.1573 13.6513 29.8675 11.9916C29.8036 11.6374 29.6539 11.3042 29.4315 11.0213C29.209 10.7383 28.9206 10.5142 28.5915 10.3685C27.5852 9.91497 26.7627 9.21643 26.2348 8.30205C25.7069 7.38914 25.5144 6.32893 25.6237 5.2308C25.6623 4.87351 25.6128 4.51222 25.4796 4.17846C25.3464 3.84469 25.1335 3.5486 24.8596 3.31601C23.5664 2.23221 22.095 1.38104 20.5108 0.800387C20.1722 0.679267 19.8091 0.642923 19.4532 0.694529C19.0973 0.746135 18.7594 0.884121 18.4692 1.09643C17.5708 1.73955 16.5544 2.10414 15.5 2.10414C14.4456 2.10414 13.4292 1.74101 12.5323 1.09643ZM11.125 14.5C11.125 13.3396 11.5859 12.2268 12.4064 11.4064C13.2269 10.5859 14.3397 10.125 15.5 10.125C16.6603 10.125 17.7731 10.5859 18.5936 11.4064C19.4141 12.2268 19.875 13.3396 19.875 14.5C19.875 15.6603 19.4141 16.7731 18.5936 17.5936C17.7731 18.414 16.6603 18.875 15.5 18.875C14.3397 18.875 13.2269 18.414 12.4064 17.5936C11.5859 16.7731 11.125 15.6603 11.125 14.5Z"
                  fill="#ECE8E8"
                />
              </svg>
              Settings
            </Link>
            <Link
              to={"/"}
              className="flex items-center p-2.5 rounded-lg hover:bg-gray-800 cursor-pointer gap-2.5"
            >
              <svg
                width="31"
                height="31"
                viewBox="0 0 31 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="max-w-6"
              >
                <path
                  d="M15.427 24.25C15.9375 24.25 16.3691 24.0735 16.722 23.7206C17.075 23.3677 17.2509 22.9365 17.25 22.427C17.249 21.9176 17.073 21.4859 16.722 21.132C16.3711 20.7782 15.9394 20.6022 15.427 20.6041C14.9147 20.6061 14.4835 20.7825 14.1335 21.1335C13.7835 21.4845 13.607 21.9157 13.6041 22.427C13.6012 22.9384 13.7777 23.3701 14.1335 23.722C14.4893 24.074 14.9205 24.25 15.427 24.25ZM14.1145 18.6354H16.8125C16.8125 17.8333 16.9039 17.2014 17.0866 16.7395C17.2694 16.2777 17.7857 15.6458 18.6354 14.8437C19.2673 14.2118 19.7656 13.61 20.1302 13.0383C20.4948 12.4666 20.677 11.7802 20.677 10.9791C20.677 9.61802 20.1788 8.57288 19.1823 7.84372C18.1857 7.11455 17.0069 6.74997 15.6458 6.74997C14.2604 6.74997 13.1365 7.11455 12.2741 7.84372C11.4118 8.57288 10.81 9.44788 10.4687 10.4687L12.875 11.4166C12.9965 10.9791 13.2702 10.5052 13.696 9.99476C14.1218 9.48434 14.7718 9.22913 15.6458 9.22913C16.4236 9.22913 17.0069 9.44205 17.3958 9.86788C17.7847 10.2937 17.9791 10.7614 17.9791 11.2708C17.9791 11.7569 17.8333 12.2129 17.5416 12.6387C17.25 13.0645 16.8854 13.4593 16.4479 13.8229C15.3784 14.7708 14.7222 15.4878 14.4791 15.9739C14.2361 16.46 14.1145 17.3472 14.1145 18.6354ZM15.5 30.0833C13.4826 30.0833 11.5868 29.7007 9.81246 28.9356C8.03816 28.1705 6.49475 27.1311 5.18225 25.8177C3.86975 24.5042 2.83093 22.9608 2.06579 21.1875C1.30066 19.4141 0.9176 17.5183 0.916628 15.5C0.915656 13.4816 1.29871 11.5858 2.06579 9.81247C2.83288 8.03913 3.8717 6.49573 5.18225 5.18226C6.49281 3.86879 8.03621 2.82997 9.81246 2.0658C11.5887 1.30163 13.4845 0.918578 15.5 0.916633C17.5154 0.914689 19.4112 1.29774 21.1875 2.0658C22.9637 2.83386 24.5071 3.87267 25.8177 5.18226C27.1282 6.49184 28.1675 8.03524 28.9356 9.81247C29.7036 11.5897 30.0862 13.4855 30.0833 15.5C30.0804 17.5144 29.6973 19.4102 28.9341 21.1875C28.1709 22.9647 27.1321 24.5081 25.8177 25.8177C24.5032 27.1273 22.9598 28.1666 21.1875 28.9356C19.4151 29.7046 17.5193 30.0872 15.5 30.0833Z"
                  fill="#ECE8E8"
                />
              </svg>
              Help
            </Link>
          </div>
          <Link
            to={"/"}
            className="flex p-2.5 rounded-lg hover:bg-gray-800 cursor-pointer gap-2.5 mt-auto items-center font-bold text-18 leading-8"
          >
            <svg
              width="31"
              height="31"
              viewBox="0 0 31 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="max-w-6"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 3.32143C0 2.44053 0.349935 1.59571 0.972824 0.972824C1.59571 0.349935 2.44053 0 3.32143 0L18.8214 0C19.7023 0 20.5471 0.349935 21.17 0.972824C21.7929 1.59571 22.1429 2.44053 22.1429 3.32143V7.61493C21.2444 8.33456 20.6615 9.37576 20.5176 10.5179H12.7321C12.0779 10.5179 11.43 10.6467 10.8256 10.8971C10.2211 11.1475 9.67187 11.5145 9.20924 11.9771C8.7466 12.4397 8.37962 12.989 8.12924 13.5934C7.87887 14.1979 7.75 14.8457 7.75 15.5C7.75 16.1543 7.87887 16.8021 8.12924 17.4066C8.37962 18.011 8.7466 18.5603 9.20924 19.0229C9.67187 19.4855 10.2211 19.8525 10.8256 20.1029C11.43 20.3533 12.0779 20.4821 12.7321 20.4821H20.5176C20.6615 21.6242 21.2444 22.6654 22.1429 23.3851V27.6786C22.1429 28.5595 21.7929 29.4043 21.17 30.0272C20.5471 30.6501 19.7023 31 18.8214 31H3.32143C2.44053 31 1.59571 30.6501 0.972824 30.0272C0.349935 29.4043 0 28.5595 0 27.6786L0 3.32143ZM24.2752 9.53693C23.9717 9.66263 23.7123 9.87552 23.5298 10.1487C23.3473 10.4218 23.25 10.7429 23.25 11.0714V13.2857H12.7321C12.1449 13.2857 11.5817 13.519 11.1664 13.9343C10.7511 14.3495 10.5179 14.9127 10.5179 15.5C10.5179 16.0873 10.7511 16.6505 11.1664 17.0657C11.5817 17.481 12.1449 17.7143 12.7321 17.7143H23.25V19.9286C23.2503 20.2568 23.3478 20.5776 23.5303 20.8504C23.7128 21.1233 23.9721 21.3359 24.2754 21.4615C24.5787 21.5871 24.9123 21.62 25.2343 21.556C25.5563 21.492 25.852 21.3341 26.0843 21.1021L30.5129 16.6736C30.8239 16.3622 30.9985 15.9401 30.9985 15.5C30.9985 15.0599 30.8239 14.6378 30.5129 14.3264L26.0843 9.89786C25.8522 9.6656 25.5565 9.50735 25.2345 9.44311C24.9125 9.37886 24.5787 9.41151 24.2752 9.53693Z"
                fill="#ECE8E8"
              />
            </svg>
            Logout
          </Link>
        </div>
      </div>

      <nav className="h-20 fixed bottom-0 left-0 w-full bg-white z-20 text-black sm:hidden">
        <div className=" flex  justify-between mx-4 mt-6 ">
          <Link to={"/"}>
            <img
              src={home}
              alt="nav icon"
              className={`w-8 ${
                location.pathname === "/" ? "border-b-4 border-[#149659]" : ""
              }`}
            />
          </Link>

          <Link to={"/"}>
            <img src={qrNavbar} alt="nav icon" className="max-w-9" />
          </Link>
          <Link to={"/map"}>
            <img
              src={mapNavbar}
              alt="nav icon"
              className={`max-w-9 ${
                location.pathname === "/map"
                  ? "border-b-4 border-[#149659]"
                  : ""
              }`}
            />
          </Link>
          <Link to={"/parking"}>
            <img
              src={parkingNav}
              alt="nav icon"
              className={`w-9 ${
                location.pathname === "/parking"
                  ? "border-b-4 border-[#149659]"
                  : ""
              }`}
            />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
