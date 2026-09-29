import { GoCheck } from "react-icons/go";
import type { AboutRadioInputType } from "./types";
import { forwardRef } from "react";
const AboutRadioInput = forwardRef<HTMLInputElement, AboutRadioInputType>(
  ({ text, name, options, error = "", ...props }: AboutRadioInputType, ref) => {
    return (
      <fieldset>
        <legend className="mb-2 font-PrimaryMediumFont text-sm text-PrimaryColor">
          {text}
        </legend>

        <div className="grid grid-cols-3 gap-2">
          {options.map((option) => (
            <label key={option.value} className="group cursor-pointer">
              <input
                ref={ref}
                type="radio"
                name={name}
                value={option.value}
                className="peer sr-only"
                {...props}
              />
              <span
                className="flex h-12 items-center justify-center gap-2 rounded-xl border border-SecondaryColor/20 bg-InputBg font-PrimaryMediumFont text-sm text-PrimaryColor transition
              peer-checked:border-TertiaryColor peer-checked:bg-TertiaryColor/15
              peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-PrimaryColor"
              >
                <GoCheck className="hidden text-TertiaryColor group-has-checked:block" />
                {option.label}
              </span>
            </label>
          ))}
        </div>
        {error && <p className="text-TertiaryColor">{error}</p>}
      </fieldset>
    );
  },
);

export default AboutRadioInput;
