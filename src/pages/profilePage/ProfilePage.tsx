import { FC, useEffect, useState } from "react";
import avatarBasic from "../../assets/images/ava-default.png";
import { useTranslation } from "react-i18next";
import edit from "../../assets/images/icons/edit_profile.svg";
import { useForm } from "react-hook-form";
import { useAtom } from "jotai";
import { notificationAtom, userAtom } from "../../store/store";
import { useMutation } from "@tanstack/react-query";
import userService from "../../services/user.service";
import ProfileInput from "../../components/ui/profileInput/ProfileInput";
import Notification from "../../components/ui/notification/Notification";
import { IUser } from "../../types/api.types";

const ProfilePage: FC = () => {
  const [isEdit, setIsEdit] = useState(false);
  const { t } = useTranslation();
  const [, setNotification] = useAtom(notificationAtom);
  const [, setUser] = useAtom(userAtom);
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<IUser>({ mode: "onTouched" });

  useEffect(() => {
    userService.getUser(setUser).then((userData) => {
      Object.keys(userData).forEach((key) => {
        setValue(key as keyof IUser, userData[key]);
      });
    });
  }, [setValue, setUser]);

  const { mutate: changeUser, isPending } = useMutation({
    mutationFn: async (jsonData: object) => {
      return userService.changeUser(jsonData, setUser).then((userData) => {
        Object.keys(userData).forEach((key) => {
          setValue(key as keyof IUser, userData[key]);
        });
      });
    },
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
        message: t("profile_order.success"),
        isOpen: true,
        isAutoClose: true,
        type: "success",
      });
    },
    onError: () => {
      setNotification({
        message: t("profile_order.error"),
        isOpen: true,
        isAutoClose: true,
        type: "error",
      });
    },
  });

  const changeUserFunc = handleSubmit(({
    email,
    username,
    firstName,
    lastName,
    phone,
    payment,
  }) => {
    const userJson = {
      email,
      username,
      firstName: firstName || " ",
      lastName: lastName || " ",
      payment: payment || " ",
      phone: phone || " ",
    };
    
    changeUser(userJson);
  });

  const toggleEdit = () => setIsEdit(!isEdit);
  
  const renderUserInfo = () => (
    <div className="sm:w-[41%] flex flex-col justify-between">
      <div className="justify-center flex flex-col items-center sm:gap-y-5">
        <img
          src={avatarBasic}
          alt="avatar"
          className="w-28 h-28 sm:w-24 sm:h-24 md:w-40 md:h-40 object-contain rounded-full absolute top-[-40px] bg-white p-2 sm:static"
        />
        <h2 className="text-green text-2xl mt-16 sm:mt-0 sm:text-2xl md:text-3xl max-w-52 text-center font-bold">
          Daniel Japrov Karalov
        </h2>
      </div>
    </div>
  );

  const renderEditForm = () => (
    <form className="w-full scrollbar-visible p-3 flex-col bg-white rounded-lg">
      <ul className="flex flex-col gap-10">
        <li>
          <label htmlFor="ava" className="overflow-hidden">
            <img
              src={avatarBasic}
              alt="avatar image"
              className="w-24 sm:w-28 md:w-36 rounded-full bg-white p-2"
            />
            <input
              id="ava"
              type="file"
              className="hidden"
              accept="image/png, image/jpeg"
              {...register("ava")}
            />
          </label>
        </li>
        <li className="flex flex-col">
          <label
            htmlFor="firstName"
            className="font-bold text-green md:text-xl text-lg md:mb-5"
          >
            {t("first_name")}
          </label>
          <ProfileInput
            {...register("firstName")}
            type="text"
            error={errors.firstName}
            placeholder="John"
          />
        </li>
        <li className="flex flex-col">
          <label
            htmlFor="lastName"
            className="font-bold text-green md:text-xl text-lg md:mb-5"
          >
            {t("last_name")}
          </label>
          <ProfileInput
            {...register("lastName")}
            type="text"
            error={errors.lastName}
            placeholder="Doe"
          />
        </li>
        <li className="flex flex-col">
          <label
            htmlFor="email"
            className="font-bold text-green md:text-xl text-lg md:mb-5"
          >
            {t("email")}
          </label>
          <ProfileInput
            error={errors.email}
            {...register("email", {
              required: t("field_required"),
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: t("invalid_email"),
              },
            })}
            type="email"
            placeholder="john.doe@example.com"
          />
        </li>
        <li className="flex flex-col">
          <label
            htmlFor="username"
            className="font-bold text-green md:text-xl text-lg md:mb-5"
          >
            {t("username")}
          </label>
          <ProfileInput
            {...register("username", {
              required: t("field_required"),
              minLength: { value: 2, message: t("min_length_2") },
            })}
            type="text"
            error={errors.username}
            placeholder="john_doe"
          />
        </li>
        <li className="flex flex-col">
          <label
            htmlFor="phone"
            className="font-bold text-green md:text-xl text-lg md:mb-5"
          >
            {t("phone_number")}
          </label>
          <ProfileInput
            error={errors.phone}
            {...register("phone")}
            type="tel"
            placeholder="+1 (555) 123-4567"
          />
        </li>
        <li className="flex flex-col">
          <label
            htmlFor="payment"
            className="font-bold text-green md:text-xl text-lg md:mb-5"
          >
            {t("payment_type")}
          </label>
          <ProfileInput
            error={errors.payment}
            {...register("payment")}
            type="text"
            placeholder="Credit card, PayPal, Cash"
          />
        </li>
      </ul>
      <div className="sm:text-18 font-semibold gap-5 justify-center bottom-9 flex mt-8">
        <button
          type="button"
          onClick={toggleEdit}
          className="w-20 h-10 md:w-32 md:h-11 text-green bg-white rounded-lg shadow-[0px_0px_13px_-3px_#636363] hover:bg-grey-200 transition-colors"
        >
          {t("cancel")}
        </button>
        <button
          disabled={!isValid || isPending}
          type="submit"
          onClick={changeUserFunc}
          className="w-28 h-10 sm:w-32 md:h-11 text-white bg-green-bg rounded-lg shadow-[0px_0px_13px_-3px_#636363] hover:bg-green-700 transition-colors"
        >
          {t("save")}
        </button>
      </div>
    </form>
  );

  const renderCarInfoForm = () => (
    <form className="sm:w-[69%] scrollbar-visible flex-col p-4 bg-white rounded-lg">
      <ul className="flex flex-col gap-4">
        <li className="flex flex-col">
          <label
            htmlFor="carModel"
            className="font-bold text-green md:text-xl text-lg md:mb-5"
          >
            {t("car_model")}
          </label>
          <ProfileInput
            {...register("carModel")}
            error={errors.carModel}
            type="text"
            placeholder="Toyota Corolla, BMW X5"
          />
        </li>
        <li className="flex flex-col">
          <label
            htmlFor="year"
            className="font-bold text-green md:text-xl text-lg md:mb-5"
          >
            {t("year_of_manufacture")}
          </label>
          <ProfileInput
            {...register("year")}
            error={errors.year}
            type="number"
            placeholder="2002, 2010, 2024"
          />
        </li>
        <li className="flex flex-col">
          <label
            htmlFor="license"
            className="font-bold text-green md:text-xl text-lg md:mb-5"
          >
            {t("license_plate_number")}
          </label>
          <ProfileInput
            {...register("license")}
            error={errors.license}
            type="text"
            placeholder="ABC-123, 777XYZ, KG 001 AA"
          />
        </li>
        <li className="flex flex-col">
          <label
            htmlFor="vin"
            className="font-bold text-green md:text-xl text-lg md:mb-5"
          >
            {t("vin_code")}
          </label>
          <ProfileInput
            {...register("vin")}
            error={errors.vin}
            type="text"
            placeholder="1HGCM82633A123456"
          />
        </li>
      </ul>

      <div className="sm:text-18 font-semibold gap-5 justify-center bottom-9 flex mt-8">
        <button
          type="button"
          className="w-24 h-10 md:w-32 md:h-11 text-green bg-white rounded-lg shadow-[0px_0px_13px_-3px_#636363] hover:bg-grey-200 transition-colors"
        >
          {t("cancel")}
        </button>
        <button
          disabled={!isValid || isPending}
          type="submit"
          onClick={changeUserFunc}
          className="w-28 h-10 sm:w-32 md:h-11 text-white bg-green-bg rounded-lg shadow-[0px_0px_13px_-3px_#636363] hover:bg-green-700 transition-colors"
        >
          {t("save")}
        </button>
      </div>
    </form>
  );

  return (
    <div className="relative">
      <Notification />
      <div className="bg-green-white h-32 w-full"></div>
      <div className="bg-white max-w-[1320px] w-[90%] min-h-[80vh] shadow-[0px_0px_20px_-3px_#636363] flex flex-col sm:flex-row flex-nowrap rounded-3xl absolute left-1/2 transform -translate-x-1/2 top-1/3 px-20 md:px-28 pb-16 md:pb-20 pt-10 md:pt-12 gap-3">
        {!isEdit && renderUserInfo()}
        <div className="flex flex-col">
          <button onClick={toggleEdit}>
            <img
              src={edit}
              alt="edit profile button"
              className="absolute left-2 top-2"
            />
          </button>
        </div>
        {isEdit ? renderEditForm() : renderCarInfoForm()}
      </div>
    </div>
  );
};

export default ProfilePage;