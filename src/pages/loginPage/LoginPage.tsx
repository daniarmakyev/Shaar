import { FC } from "react";
import bannerImage from "../../assets/images/login-banner.jpg";
import bgImage from "../../assets/images/background.jpg";
import Input from "../../components/ui/input/Input";
import profileIcon from "../../assets/images/icons/profile-green.svg";
import arrowIcon from "../../assets/images/icons/arrow-green.svg";
import arrowIconWhite from "../../assets/images/icons/arrow.svg";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ILoginForm } from "../../types/client.types";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import authService from "../../services/auth.service";
import { useAtom } from "jotai";
import { isAuthAtom, notificationAtom } from "../../store/store";
import { useTranslation } from "react-i18next";
import { saveTokens } from "../../constants/helpers";
import passwordIcon from "../../assets/images/icons/password-green.svg";
const LoginPage: FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ILoginForm>({ mode: "onTouched" });
  const [, setNotification] = useAtom(notificationAtom);
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
    onSuccess: ({ data: { accessToken, refreshToken } }) => {
      saveTokens(accessToken, refreshToken);
      setIsAuth(true);
      setNotification({
        message: t("orderLogin.success"),
        isOpen: true,
        isAutoClose: true,
        type: "success",
      });
      navigate("/");
    },
    onError: () => {
      setNotification({
        message: t("orderLogin.error"),
        isOpen: true,
        isAutoClose: true,
        type: "error",
      });
    },
  });

  const loginFunc: SubmitHandler<ILoginForm> = (data) => {
    login(data);
  };

  if (isAuth) return <Navigate to="/" />;

  return (
    <div className="flex min-h-screen overflow-x-hidden flex-col md:flex-row">
      <div
        className="m-0 hidden md:block md:pt-70 md:px-60 md:m-none md:w-[50vw]  w-auto bg-cover bg-center"
        style={{ backgroundImage: `url(${bannerImage})` }}
      >
        <button onClick={() => navigate(-1)}>
          <img
            src={arrowIcon}
            alt="arrow"
            className="max-w-10 absolute top-[5%] left-5"
          />
        </button>
      </div>

      <div
        style={{ backgroundImage: `url(${bgImage})` }}
        className="pl-1 pr-1 md:pl-[67px] bg-contain h-auto md:h-screen flex-auto text-white text-center flex flex-col items-center justify-center gap-y-9"
      >
        <button
          onClick={() => navigate(-1)}
          className="absolute left-5 top-4 md:hidden"
        >
          <img src={arrowIconWhite} alt="arrow" />
        </button>
        <form className="mx-auto  md:w-[50vw] mt-9 md:mt-0  flex flex-col items-center justify-center gap-y-9">
          <h1 className="text-nowrap text-xl sm:text-[30px] md:text-[40px] lg:text-[50px] font-bold [text-shadow:_1px_1px_8px_black] uppercase">
            {t("sign_in")}
          </h1>
          <Input
            icon={profileIcon}
            type="email"
            placeholder={t("email_placeholder")}
            error={errors.email}
            className=" bg-white placeholder-black-bg "
            {...register("email", {
              required: t("field_required"),
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: t("invalid_email"),
              },
            })}
          />
          <Input
            isPassword
            icon={passwordIcon}
            className=" bg-white "
            inputClassName="!text-black"
            placeholder={t("password_placeholder")}
            error={errors.password}
            {...register("password", {
              required: t("field_empty"),
              minLength: { value: 5, message: t("min_length") },
            })}
          />
          <button
            disabled={!isValid || isPending}
            onClick={handleSubmit(loginFunc)}
            className="btn text-green-bg bg-white px-4 py-1 rounded-xl font-bold"
          >
            {t("sign_in")}
          </button>
          <span className="hidden md:block     md:max-w-72 bg-cover bg-center">
            {t("dont_have_account")}{" "}
            <Link to="/register" className="text-green-black font-bold">
              {t("sign_up")}
            </Link>
          </span>
        </form>
      </div>
      <span
        className="items-center justify-center md:hidden text-white flex  md:max-w-72  bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        {t("dont_have_account")}{" "}
        <Link to="/register" className="text-green-black font-bold">
          {t("sign_up")}
        </Link>
      </span>
    </div>
  );
};

export default LoginPage;
