import { forwardRef } from "react";
import type { TextareaInputType } from "./types";

const TextareaInput = forwardRef<HTMLTextAreaElement, TextareaInputType>(
  (
    {
      text,
      extraDescription = "",
      name = "",
      error = "",
      defaultValue = "",
      ...props
    }: TextareaInputType,
    ref,
  ) => {
    return (
      <fieldset className="fieldset">
        <legend className="fieldset-legend flex items-center justify-between w-full">
          <p>{text}</p>
          <div className="label">{extraDescription}</div>
        </legend>
        <textarea
          ref={ref}
          className="textarea w-full rounded-xl resize-none min-h-28 bg-SecondaryDarkBgColor"
          defaultValue={defaultValue}
          maxLength={300}
          placeholder="Something honest, maybe a little funny."
          name={name}
          {...props}
        ></textarea>
        {error && <p className="text-TertiaryColor">{error}</p>}
      </fieldset>
    );
  },
);

export default TextareaInput;
