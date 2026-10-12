import type { SelectInputType } from "./types";

const SelectInput = ({
  text,
  name,
  options,
  defaultValue
}: SelectInputType) => (
  <fieldset className="fieldset text-PrimaryColor">
    <label className="label" htmlFor={name}>
      {text}
    </label>
    <select id={name} name={name} className="select bg-InputBg w-full" defaultValue={defaultValue}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </fieldset>
);

export default SelectInput