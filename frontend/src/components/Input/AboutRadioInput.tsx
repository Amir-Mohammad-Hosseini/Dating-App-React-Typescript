import { GoCheck } from "react-icons/go";
import type { AboutRadioInputType } from "./types";
const AboutRadioInput = ({
  text,
  name,
  options,
  value,
  onChange,
}: AboutRadioInputType) => {
  return (
    <fieldset>
      <legend className="mb-2 font-PrimaryMediumFont text-sm text-PrimaryColor">
        {text}
      </legend>

      <div className="grid grid-cols-3 gap-2">
        {options.map((option) => (
          <label key={option.value} className="group cursor-pointer">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="peer sr-only"
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
    </fieldset>
  );
};

export default AboutRadioInput;
