import { forwardRef, useId } from "react";
import type { RangeInputType } from "./types";

const RangeInput = forwardRef<HTMLInputElement, RangeInputType>(
  (
    { text, name, min, max, extraDescription, defaultValue , ...props }: RangeInputType,
    ref,
  ) => {
    const id = useId();
    return (
      <fieldset>
        <label
          htmlFor={id}
          className="flex items-center justify-between text-SecondaryColor mb-2"
        >
          {text}
          <p>{extraDescription}</p>
        </label>
        <input
          ref={ref}
          type="range"
          id={id}
          name={name}
          min={min}
          max={max}
          {...props}
          className="range text-TertiaryColor w-full [--range-thumb:var(--color-PrimaryDarkBgColor)] [--range-bg:var(--color-PrimaryDarkBgColor)]"
        />
      </fieldset>
    );
  },
);

export default RangeInput;
