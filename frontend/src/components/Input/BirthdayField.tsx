import { useState } from 'react'
import type { FieldValues } from 'react-hook-form';
import { GoLock } from 'react-icons/go';
import type { BirthdayFieldProps } from './types';
import convertDateToAge from '../../utils/birthday-input';

const BirthdayField = <T extends FieldValues>({
  field,
  error,
}: BirthdayFieldProps<T>) => {
  const [dateValue, setDateValue] = useState("");
  const age = convertDateToAge(dateValue);

  const handleChange = (value: string) => {
    setDateValue(value);
    field.onChange(convertDateToAge(value) ?? undefined);
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

export default BirthdayField
