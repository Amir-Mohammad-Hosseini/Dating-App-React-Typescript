import type { RadioInputType } from "./types";

const RadioInput = <
  T extends { label: string; value: unknown },
>({
  options,
  text,
  className = "",
  selectedValue,
  onChange,
}: RadioInputType<T>) => {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="mb-2 text-SecondaryColor">
        {text}
      </legend>

      <div className={`flex flex-wrap gap-2 ${className}`}>
        {options.map((option) => (
          <label
            key={option.label}
            className="cursor-pointer"
          >
            <input
              type="radio"
              name="showMe"
              value={option.label}
              checked={selectedValue === option.label}
              onChange={() => onChange?.(option)}
              className="peer sr-only"
            />

            <span
              className="
                block rounded-full
                border border-SecondaryColor/30
                bg-SecondaryDarkBgColor
                px-5 py-2
                text-SecondaryColor
                transition
                peer-checked:border-TertiaryColor
                peer-checked:bg-TertiaryColor
                peer-checked:text-SecondaryDarkBgColor
                peer-focus-visible:outline-2
                peer-focus-visible:outline-offset-2
                peer-focus-visible:outline-PrimaryColor
              "
            >
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
};

export default RadioInput