import { FC } from "react";
import bannerImage from "../../assets/images/login-banner.jpg";
import bgImage from "../../assets/images/background.jpg";
import Input from "../../components/ui/input/Input";
import profileIcon from "../../assets/images/icons/profile-green.svg";
import arrowIcon from "../../assets/images/icons/arrow-green.svg";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ILoginForm } from "../../types/client.types";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import authService from "../../services/auth.service";
import { useAtom } from "jotai";
import { isAuthAtom, notificationAtom } from "../../store/store";
import { useTranslation } from "react-i18next";
import { saveTokens } from "../../constants/helpers";

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ILoginForm>({ mode: "onTouched" });
  const [_, setNotification] = useAtom(notificationAtom);
  const [isAuth, setIsAuth] = useAtom(isAuthAtom);
  const { t } = useTranslation();

  const { mutate: login, isPending } = useMutation({
    mutationFn: authService.login,
    onMutate: () => {
      setNotification({
        message: t("loading"),
        isOpen: true,
        isAutoClose: false,
        type: "loading",
      });
    },
    onSuccess: ({ data: { access, refresh } }) => {
      saveTokens(access, refresh);
      setIsAuth(true);
      setNotification({
        message: t("order.success"),
        isOpen: true,
        isAutoClose: true,
        type: "success",
      });
      navigate("/");
    },
  });

  const loginFunc: SubmitHandler<ILoginForm> = (data) => {
    login(data);
  };

  if (isAuth) return <Navigate to="/" />;

  return (
    <div className="flex h-screen">
      <div
        className="m-0 hidden md:block md:pt-70 md:px-60 md:m-none md:flex-[0_1_810px]"
        style={{ backgroundImage: `url(${bannerImage})` }}
      >
        <button onClick={() => navigate(-1)}>
          <img src={arrowIcon} alt="arrow" />
        </button>
      </div>

      <div
        style={{ backgroundImage: `url(${bgImage})` }}
        className="pl-1 pr-1 md:pl-[67px] bg-cover flex-auto text-white text-center"
      >
        <button
          onClick={() => navigate(-1)}
          className="absolute left-5 top-4 md:hidden"
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 47 46"
            fill="#fff"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M43.9998 20H10.4898L25.1298 5.35999C26.2998 4.18999 26.2998 2.26999 25.1298 1.09999C24.8522 0.821877 24.5226 0.601234 24.1596 0.45069C23.7967 0.300145 23.4077 0.222656 23.0148 0.222656C22.6219 0.222656 22.2328 0.300145 21.8699 0.45069C21.507 0.601234 21.1773 0.821877 20.8998 1.09999L1.12977 20.87C0.851663 21.1475 0.631021 21.4772 0.480476 21.8401C0.329932 22.203 0.252441 22.5921 0.252441 22.985C0.252441 23.3779 0.329932 23.7669 0.480476 24.1299C0.631021 24.4928 0.851663 24.8224 1.12977 25.1L20.8998 44.87C21.1775 45.1477 21.5073 45.368 21.8701 45.5184C22.233 45.6687 22.622 45.746 23.0148 45.746C23.4076 45.746 23.7965 45.6687 24.1594 45.5184C24.5223 45.368 24.852 45.1477 25.1298 44.87C25.4075 44.5922 25.6278 44.2625 25.7782 43.8996C25.9285 43.5367 26.0058 43.1478 26.0058 42.755C26.0058 42.3622 25.9285 41.9732 25.7782 41.6104C25.6278 41.2475 25.4075 40.9177 25.1298 40.64L10.4898 26H43.9998C45.6498 26 46.9998 24.65 46.9998 23C46.9998 21.35 45.6498 20 43.9998 20Z"
              fill="fff"
            />
          </svg>
        </button>
        <div className="mx-auto max-w-[520px] flex flex-col items-center mt-48 md:mt-20">
          <h1 className="text-nowrap mt-20 md:mt-0 sm:mt-20 text-[60px] sm:text-[80px] md:text-[100px] lg:text-[118px] font-bold [text-shadow:_1px_1px_8px_black] uppercase">
            Sign In
          </h1>

          <Input
            icon={profileIcon}
            className="mt-[60px] md:mt-[133px] mb-40 bg-white placeholder-black-bg"
            inputClassName="!text-black"
            placeholder="youremail@gmail.com"
            error={errors.username}
            {...register("username", {
              required: "Поле не может быть пустым",
              minLength: { value: 2, message: "Минимум две букв" },
            })}
          />
          <Input
            isPassword
            icon={profileIcon}
            className="mb-4 mt-10 md:mt-40 md:mb-30 bg-white min-w-[320px]"
            inputClassName="!text-black"
            placeholder="your password"
            error={errors.password}
            {...register("password", {
              required: "Поле не может быть пустым",
              minLength: { value: 5, message: "Минимум пять символов" },
            })}
          />
          <button
            disabled={!isValid || isPending}
            onClick={handleSubmit(loginFunc)}
            className="btn py-2 mt-[40px] sm:mt-[100px] md:mt-[100px] mb-[27px] rounded-[43px] sm:px-[50px] md:px-[102px] md:py-[18px] bg-white text-green-white font-bold text-24 md:text-[40px]"
          >
            Sign In
          </button>
          <span className="block text-[24px] max-w-72 mx-auto">
            Don't hava an account?{" "}
            <Link to="/register" className="text-green-black font-bold">
              Sign up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
