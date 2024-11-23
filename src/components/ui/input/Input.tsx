import clsx from "clsx";
import { forwardRef, useState } from "react";
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

    return (
      <div
        className={clsx(
          " relative rounded-[40px] py-[12px] px-[18px] flex gap-3 items-center bg-green-white shadow-[1px_1px_7px_black] md:max-w-md lg:max-w-none md:h-20 lg:h-auto max-h-16 md:max-h-none max-w-80",
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
            "text-18 md:text-[24px] text-white me-auto placeholder-[#a9a9a9]",
            isPassword
              ? "max-w-[60%] md:max-w-[60%]"
              : "max-w-60 md:max-w-[400px]",
            inputClassName && `!${inputClassName}` 
          )}
          type={isPassword ? (isPasswordHidden ? "text" : "password") : type}
          {...register}
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
          <span className="absolute text-red bottom-[-30px]">
            {error.message}
          </span>
        )}
      </div>
    );
  }
);

export default Input;
