import { forwardRef } from "react";
import type { SelectInputType } from "./types";

const SelectInput = forwardRef<HTMLSelectElement, SelectInputType>(
  ({ text, name, options, error = "", defaultValue }: SelectInputType, ref) => (
    <fieldset className="fieldset text-PrimaryColor">
      <label className="label" htmlFor={name}>
        {text}
      </label>
      <select
        ref={ref}
        id={name}
        name={name}
        className="select bg-InputBg w-full"
        defaultValue={defaultValue}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-TertiaryColor">{error}</p>}
    </fieldset>
  ),
);

export default SelectInput;
