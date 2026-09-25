import { forwardRef } from "react";
import type InputType from "./types";
const Input = forwardRef<HTMLInputElement, InputType>(
  (
    { text, name, type, isForgotPassword, placeholder, error = "" , ...props }: InputType,
    ref,
  ) => {
    return (
      <fieldset className="fieldset text-PrimaryColor">
        <label
          className="label flex items-center justify-between"
          htmlFor={name}
        >
          {text}
          {isForgotPassword && (
            <p className="text-TertiaryColor">Forgot password?</p>
          )}
        </label>
        <input
          ref={ref}
          type={type}
          id={name}
          name={name}
          className="input bg-InputBg w-full"
          placeholder={placeholder}
          {...props}
        />
        {error && <p className="text-sm text-TertiaryColor">{error}</p>}
      </fieldset>
    );
  },
);

export default Input;
