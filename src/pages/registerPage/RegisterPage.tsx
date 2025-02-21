import { FC } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import bgImage from "../../assets/images/background.jpg";
import arrowIcon from "../../assets/images/icons/arrow.svg";
import cameraIcon from "../../assets/images/icons/camera.svg";
import Input from "../../components/ui/input/Input";
import profileIcon from "../../assets/images/icons/profile.svg";
import emailIcon from "../../assets/images/icons/email.svg";
import passwordIcon from "../../assets/images/icons/password.svg";
import { SubmitHandler, useForm } from "react-hook-form";
import { IRegisterForm } from "../../types/client.types";
import { useMutation } from "@tanstack/react-query";
import authService from "../../services/auth.service";
import { useAtom } from "jotai";
import { isAuthAtom, notificationAtom } from "../../store/store";
import { useTranslation } from "react-i18next";
import avaDefaultImage from "../../assets/images/ava-default.png";
import { urlToFile } from "../../constants/helpers";

const RegisterPage: FC = () => {
  const navigate = useNavigate();
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IRegisterForm>({ mode: "onTouched" });
  const { t } = useTranslation();
  const [_, setNotification] = useAtom(notificationAtom);
  const [isAuth] = useAtom(isAuthAtom);

  const { mutate: registerUser, isPending } = useMutation({
    mutationFn: authService.register,
    onMutate: () => {
      setNotification({
        message: t("loading"),
        isOpen: true,
        isAutoClose: false,
        type: "loading",
      });
    },
    onSuccess: () => {
      setNotification({
        message: t("order.success"),
        isOpen: true,
        isAutoClose: true,
        type: "success",
      });
      navigate("/login");
    },
    onError: () => {
      setNotification({
        message: t("order.error"),
        isOpen: true,
        isAutoClose: true,
        type: "error",
      });
    },
  });

  const registerFunc: SubmitHandler<IRegisterForm> = async ({
    email,
    username,
    password,
    // ava,
  }) => {
    // const defaultAvaFile = await urlToFile(avaDefaultImage, "ava-default.png");
    const form = new FormData();
    form.append("email", email);
    form.append("username", username);
    form.append("password", password);
    // form.append("ava", ava[0] || defaultAvaFile);
    registerUser(form);
  };

  if (isAuth) return <Navigate to="/" />;

  return (
    <div
      style={{ backgroundImage: `url(${bgImage})` }}
      className=" pt-[37px]  text-white  bg-cover bg-center"
    >
      <div className="container h-[16vh] pb-16 md:pb-0 max-w-[1320px] flex justify-center items-center">
        <button
          onClick={() => navigate(-1)}
          className="max-w-6 absolute left-3 top-2 sm:top-auto sm:left-8"
        >
          <img src={arrowIcon} alt="arrow" />
        </button>
        <h1 className="text-2xl md:text-[50px] font-bold uppercase md:mt-3 mb-8">
          {t("sign_up")}
        </h1>
        <div></div>
      </div>
      <div className="min-h-screen    rounded-[40px_40px_0_0] md:rounded-[100px_100px_0_0] pt-[62px] bg-gray  ">
        <div className="max-w-[1320px] mx-auto flex bg-gray md:bg-transparent   justify-center md:justify-around md:items-stretch items-center text-center flex-col md:flex-row">
          <div className="-mt-32 md:mt-0  flex-col flex  items-center md:mb-0 pb-9 ">
            <label
              htmlFor="ava"
              className=" overflow-hidden    sm:max-w-36 mb-3 md:mb-4 md:max-w-52  "
            >
              {/* {watch("ava")?.[0] ? (
                  <img
                    alt="ava"
                    src={URL.createObjectURL(watch("ava")[0])}
                    className="w-full h-full object-cover rounded-circle max-w-32 max-h-32 mx-auto sm:max-w-36 sm:max-h-36 md:max-w-60 md:max-h-60 lg:max-w-none lg:max-h-none"
                  />
                ) : ( */}
              <img
                src={cameraIcon}
                alt="camera"
                className="max-w-40 bg-white rounded-full w-full mx-auto"
              />
              {/* )} */}
              <input
                id="ava"
                type="file"
                className="hidden"
                accept="image/png, image/jpeg"
                {...register("ava")}
              />
            </label>
            <span className="text-[#AFAFAF] text-base sm:text-lg md:text-xl lg:text-2xl max-w-52 md:max-w-72">
              {t("add_photo")}
            </span>
          </div>
          <form className="flex  flex-col items-center gap-y-7 bg-gray md:w-auto w-full">
            <Input
              icon={emailIcon}
              type="email"
              placeholder={t("email_placeholder")}
              error={errors.email}
              {...register("email", {
                required: t("field_required"),
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: t("invalid_email"),
                },
              })}
            />
            <Input
              icon={profileIcon}
              placeholder={t("username_placeholder")}
              error={errors.username}
              {...register("username", {
                required: t("field_required"),
                minLength: { value: 5, message: t("min_length_2") },
              })}
            />
            <Input
              isPassword
              icon={passwordIcon}
              placeholder={t("password_placeholder")}
              className=""
              error={errors.password}
              {...register("password", {
                required: t("field_required"),
                minLength: { value: 5, message: t("min_length_5") },
              })}
            />
            <button
              disabled={!isValid || isPending}
              onClick={handleSubmit(registerFunc)}
              className="btn  bg-green-bg text-white px-4 py-1 rounded-xl font-bold"
            >
              {t("sign_up")}
            </button>
            <div className="text-center">
              <span className=" text-green-white">
                {t("already_have_account")}{" "}
                <Link to="/login" className="font-bold">
                  {t("sign_in")}
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
