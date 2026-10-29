import { forwardRef } from "react";
import type InputType from "./types";
import { Link } from "react-router";
const Input = forwardRef<HTMLInputElement, InputType>(
  (
    { text, name, type, isForgotPassword, placeholder, error = "" , defaultvalue = "" , ...props }: InputType,
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
            <Link to="/forgot-password" className="text-TertiaryColor">Forgot password?</Link>
          )}
        </label>
        <input
          ref={ref}
          type={type}
          id={name}
          name={name}
          className="input bg-InputBg w-full"
          placeholder={placeholder}
          defaultValue={defaultvalue}
          {...props}
        />
        {error && <p className="text-sm text-TertiaryColor">{error}</p>}
      </fieldset>
    );
  },
);

export default Input;
