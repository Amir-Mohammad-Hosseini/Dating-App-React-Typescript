import { GoCheck } from "react-icons/go";
import type { CheckboxInputType } from "./types";
import { forwardRef } from "react";

const CheckboxInput = forwardRef<HTMLInputElement, CheckboxInputType>(
  (
    {
      text,
      extraDescription,
      className = "",
      options,
      error = "",
      ...props
    }: CheckboxInputType,
    ref,
  ) => {
    return (
      <fieldset className="fieldset">
        <legend className="fieldset-legend flex items-center justify-between w-full mb-2">
          <p>{text}</p>
          <div className="label">{extraDescription}</div>
        </legend>
        <div className={`flex flex-wrap gap-2 ${className}`}>
          {options.map((option) => (
            <label key={option} className="group cursor-pointer">
              <input
                ref={ref}
                type="checkbox"
                value={option.toLowerCase()}
                className="peer sr-only"
                {...props}
              />
              <span
                className="flex items-center gap-2 capitalize rounded-full border border-PrimaryColor/30 bg-PrimaryDarkBgColor px-5 py-2 text-PrimaryColor transition
    peer-checked:border-TertiaryColor peer-checked:bg-TertiaryColor
    peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-PrimaryColor"
              >
                <GoCheck className="hidden group-has-checked:block" />
                {option}
              </span>
            </label>
          ))}
        </div>
        {error && <p className="text-TertiaryColor">{error}</p>}
      </fieldset>
    );
  },
);

export default CheckboxInput;
