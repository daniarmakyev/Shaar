import clsx from "clsx";
import { forwardRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import passwordHiddenIcon from "../../../assets/images/icons/password-hidden.svg";
import { FieldError } from "react-hook-form";

interface Props {
  icon: string;
  type?: string;
  placeholder?: string;
  className?: string;
  isPassword?: boolean;
  error?: FieldError;
  inputClassName?: string;
}

const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      icon,
      type = "text",
      placeholder = "",
      className = "",
      inputClassName = "",
      isPassword = false,
      error,
      ...register
    },
    ref
  ) => {
    const [isPasswordHidden, setIsPasswordHidden] = useState(false);
    const location = useLocation(); 

    const isLoginPage = location.pathname === "/login";
    const isRegisterPage = location.pathname === "/register";

    return (
      <div
        className={clsx(
          "relative rounded-[40px] py-[12px] px-[18px] flex gap-3 items-center bg-green-white shadow-[1px_1px_7px_black] md:max-w-md lg:max-w-none md:h-20 lg:h-auto max-h-16 md:max-h-none max-w-80",
          className
        )}
      >
        <img
          src={icon}
          alt="input"
          className="w-[75px] h-[75px] max-w-10 lg:max-h-none md:max-w-none lg:max-w-none md:h-20 lg:h-auto max-h-16 md:max-h-none"
        />
        <input
          ref={ref}
          placeholder={placeholder}
          className={clsx(
            "text-18 md:text-[24px] me-auto !bg-transparent",
            isLoginPage ? "placeholder-[#3e3e3e]" : "placeholder-[#e1e1e1]",
            isPassword
              ? "max-w-[60%] md:max-w-[60%]"
              : "max-w-60 md:max-w-[400px]",
            inputClassName && `!${inputClassName}`
          )}
          type={isPassword ? (isPasswordHidden ? "text" : "password") : type}
          {...register}
          style={{
            transition:
              "background-color 5000s ease-in-out 0s, color 5000s ease-in-out 0s",
            color: isLoginPage ? "black" : "white", 
            backgroundColor: "transparent",
          }}
        />

        {isPassword && (
          <button
            className="absolute right-[37px]"
            onClick={() => setIsPasswordHidden((prev) => !prev)}
          >
            <img
              src={passwordHiddenIcon}
              alt=""
              className="max-w-6 md:max-w-8"
            />
          </button>
        )}

        {error && (
          <span className="absolute text-[#ff3535] text-sm bottom-[-30px] inline-block">
            <span style={{ WebkitTextStroke: "1px #e80808" }}>
              {error.message}
            </span>
          </span>
        )}

        <style>
          {`
            input:-webkit-autofill {
              background-color: transparent !important;
              color: ${isLoginPage ? "black" : "white"} !important;
            }
            input:-moz-autofill {
              background-color: transparent !important;
              color: ${isLoginPage ? "black" : "white"} !important;
            }
          `}
        </style>
      </div>
    );
  }
);

export default Input;
