import { useId } from "react";
import type { RangeInputType } from "./types";

const RangeInput = ({
  text,
  name,
  min,
  max,
  extraDescription,
  defaultValue,
}: RangeInputType) => {
  const id = useId()
  return (
    <fieldset>
      <label htmlFor={id} className="flex items-center justify-between text-SecondaryColor mb-2">
        {text}
        <p>{extraDescription}</p>
      </label>
      <input
        type="range"
        id={id}
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
