import { forwardRef,   } from "react";
import { FieldError } from "react-hook-form";

interface Props {
  type?: string;
  placeholder?: string;
  className?: string;
  error?: FieldError;
  inputClassName?: string;
}

const ProfileInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      // inputClassName,
      className,
      // type,
      placeholder = "",
      error,
      ...register
    },
    ref
  ) => {
    return (
      <div className="relative">
        <input
          ref={ref}
          placeholder={placeholder}
          className={`w-full border-b p-2 text-grey border-grey focus:outline-none focus:border-green transition-colors ${className}`}
          {...register}
        />
        {error && (
          <span className="absolute bottom-[-40px] left-0 text-[#ff3535] text-sm  inline-block">
            <span style={{ WebkitTextStroke: "1px #e80808" }}>
              {error.message}
            </span>
          </span>
        )}
      </div>
    );
  }
);

export default ProfileInput;
