import { GoCheck } from "react-icons/go";
import type { CheckboxInputType } from "./types";

const CheckboxInput = ({
  text,
  extraDescription,
  className = "",
  options,
}: CheckboxInputType) => {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend flex items-center justify-between w-full mb-2">
        <p>{text}</p>
        <div className="label">{extraDescription}</div>
      </legend>
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {options.map((option, i) => (
          <label key={option} className="group cursor-pointer">
            <input
              type="checkbox"
              name={option}
              value={option.toLowerCase()}
              defaultChecked={i === 0}
              className="peer sr-only"
            />
            <span
              className="flex items-center gap-2 rounded-full border border-PrimaryColor/30 bg-PrimaryDarkBgColor px-5 py-2 text-PrimaryColor transition
    peer-checked:border-TertiaryColor peer-checked:bg-TertiaryColor
    peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-PrimaryColor"
            >
              <GoCheck className="hidden group-has-checked:block" />
              {option}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
};

export default CheckboxInput;
