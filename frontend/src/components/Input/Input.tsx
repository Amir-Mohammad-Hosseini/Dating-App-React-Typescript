import type InputType from "./types";
const Input = ({ text, name, type, isForgotPassword , placeholder }: InputType) => {
  return (
    <fieldset className="fieldset text-PrimaryColor">
      <label className="label flex items-center justify-between" htmlFor={name}>
        {text}
        {isForgotPassword && (
          <p className="text-TertiaryColor">Forgot password?</p>
        )}
      </label>
      <input
        type={type}
        id={name}
        className="input bg-InputBg w-full"
        placeholder={placeholder}
      />
    </fieldset>
  );
};

export default Input;
