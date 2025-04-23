import clsx from "clsx";
import { forwardRef, useState } from "react";
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

    return (
      <div
        className={clsx(
          "relative rounded-[40px] flex gap-3 items-center bg-green-white shadow-[1px_1px_7px_black] ",
          className
        )}
      >
        <img
          src={icon}
          alt="input"
          className="max-h-11 p-2"
        />
        <input
          ref={ref}
          placeholder={placeholder}
          className={clsx(
            "!bg-transparent",
            isLoginPage ? "placeholder-[#3e3e3e]" : "placeholder-[#e1e1e1]",
            isPassword
              ? ""
              : " ",
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
            className="absolute right-[0px]  rounded-r-xl opacity-85"
            type="button"
            onClick={() => setIsPasswordHidden((prev) => !prev)}
          >
            <img
              src={passwordHiddenIcon}
              alt="password button"
              className="max-h-9 max-w-7"
            />
          </button>
        )}

        {error && (
          <span className="absolute text-[#ff3535] text-xs md:text-sm bottom-[-25px] inline-block">
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
