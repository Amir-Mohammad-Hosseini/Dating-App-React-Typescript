import type { RangeInputType } from "./types";

const RangeInput = ({
  text,
  name,
  min,
  max,
  extraDescription,
  defaultValue,
}: RangeInputType) => {
  return (
    <fieldset>
      <label htmlFor={name} className="flex items-center justify-between text-SecondaryColor mb-2">
        {text}
        <p>{extraDescription}</p>
      </label>
      <input
        type="range"
        name={name}
        min={min}
        max={max}
        value="40"
        defaultValue={defaultValue}
        className="range text-TertiaryColor w-full [--range-thumb:var(--color-PrimaryDarkBgColor)] [--range-bg:var(--color-PrimaryDarkBgColor)]"
      />
    </fieldset>
  );
};

export default RangeInput;
