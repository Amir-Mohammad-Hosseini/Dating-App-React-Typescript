import { useState } from "react";
import { Controller } from "react-hook-form";
import type {
  Control,
  ControllerRenderProps,
  FieldValues,
  Path,
} from "react-hook-form";
import { GoLock } from "react-icons/go";

const dateToAge = (dateString: string): number | null => {
  if (!dateString) return null;
  const birth = new Date(dateString);
  if (Number.isNaN(birth.getTime())) return null;

  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const hadBirthdayThisYear =
    today.getMonth() > birth.getMonth() ||
    (today.getMonth() === birth.getMonth() &&
      today.getDate() >= birth.getDate());
  if (!hadBirthdayThisYear) age -= 1;

  return age >= 0 ? age : null;
};

type BirthdayFieldProps<T extends FieldValues> = {
  field: ControllerRenderProps<T, Path<T>>;
  error?: string;
};

const BirthdayField = <T extends FieldValues>({
  field,
  error,
}: BirthdayFieldProps<T>) => {
  const [dateValue, setDateValue] = useState("");
  const age = dateToAge(dateValue);

  const handleChange = (value: string) => {
    setDateValue(value);
    field.onChange(dateToAge(value) ?? undefined);
  };

  return (
    <div role="group" aria-labelledby="birthday-label">
      <div className="mb-2 flex items-center justify-between">
        <span
          id="birthday-label"
          className="font-PrimaryMediumFont text-sm text-PrimaryColor"
        >
          Birthday
        </span>
        {age !== null && (
          <span className="text-sm text-SecondaryColor">{age} years old</span>
        )}
      </div>

      <input
        type="date"
        className="input bg-InputBg text-PrimaryColor w-full"
        value={dateValue}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={field.onBlur}
        ref={field.ref}
      />

      {error && <p className="text-TertiaryColor mt-1 text-sm">{error}</p>}

      <p className="text-SecondaryColor mt-3 flex items-center gap-2 text-sm">
        <GoLock aria-hidden="true" />
        We show your age, never your birthday.
      </p>
    </div>
  );
};

type BirthdayInputProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  error?: string;
};

const BirthdayInput = <T extends FieldValues>({
  name,
  control,
  error,
}: BirthdayInputProps<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => <BirthdayField field={field} error={error} />}
  />
);

export default BirthdayInput;
