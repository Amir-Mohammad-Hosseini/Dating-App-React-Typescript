import type { RadioInputType } from "./types";


const RadioInput = ({options , text , className = ""} :RadioInputType) => {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="mb-2 text-SecondaryColor">{text}</legend>

      <div className={`flex flex-wrap gap-2 ${className}`}>
        {options.map((option, i) => (
          <label key={option} className="cursor-pointer">
            <input
              type="radio"
              name="showMe"
              value={option.toLowerCase()}
              defaultChecked={i === 0}
              className="peer sr-only"
            />
            <span
              className="block rounded-full border border-SecondaryColor/30 bg-SecondaryDarkBgColor px-5 py-2 text-SecondaryColor transition
              peer-checked:border-TertiaryColor peer-checked:bg-TertiaryColor peer-checked:text-SecondaryDarkBgColor
              peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-PrimaryColor"
            >
              {option}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default RadioInput
