import type { TextareaInputType } from "./types";

const TextareaInput = ({ text, extraDescription = "" , name = "" }: TextareaInputType) => {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend flex items-center justify-between w-full">
        <p>{text}</p>
        <div className="label">{extraDescription}</div>
      </legend>
      <textarea className="textarea w-full rounded-xl resize-none min-h-28 bg-SecondaryDarkBgColor" maxLength={300} placeholder="Something honest, maybe a little funny." name={name} ></textarea>
    </fieldset>
  );
};

export default TextareaInput;
