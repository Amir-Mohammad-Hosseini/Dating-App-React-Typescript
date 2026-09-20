import { GoLock } from "react-icons/go";
import type { Birthday, BirthdayInputType } from "./types";

const FIELDS = [
  { key: "day", label: "Day", placeholder: "DD", maxLength: 2, autoComplete: "bday-day" },
  { key: "month", label: "Month", placeholder: "MM", maxLength: 2, autoComplete: "bday-month" },
  { key: "year", label: "Year", placeholder: "YYYY", maxLength: 4, autoComplete: "bday-year" },
] as const;

// Returns the age in years, or null while the date is incomplete / not a real date
const getAge = ({ day, month, year }: Birthday): number | null => {
  if (!day || !month || year.length !== 4) return null;

  const d = Number(day);
  const m = Number(month);
  const y = Number(year);

  const birth = new Date(y, m - 1, d);
  const isRealDate =
    birth.getFullYear() === y &&
    birth.getMonth() === m - 1 &&
    birth.getDate() === d;
  if (!isRealDate) return null;

  const today = new Date();
  let age = today.getFullYear() - y;
  const hadBirthdayThisYear =
    today.getMonth() > m - 1 ||
    (today.getMonth() === m - 1 && today.getDate() >= d);
  if (!hadBirthdayThisYear) age -= 1;

  return age >= 0 ? age : null;
};

const BirthdayInput = ({ value, onChange }: BirthdayInputType) => {
  const age = getAge(value);

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

      <div className="grid grid-cols-[1fr_1fr_1.6fr] gap-2">
        {FIELDS.map((field) => (
          <input
            key={field.key}
            type="text"
            inputMode="numeric"
            aria-label={field.label}
            autoComplete={field.autoComplete}
            placeholder={field.placeholder}
            maxLength={field.maxLength}
            value={value[field.key]}
            onChange={(e) =>
              onChange({
                ...value,
                [field.key]: e.target.value.replace(/\D/g, ""),
              })
            }
            className="h-12 w-full rounded-xl border border-SecondaryColor/20 bg-InputBg px-4 font-PrimaryMediumFont text-PrimaryColor outline-none transition placeholder:text-SecondaryColor/60 focus:border-TertiaryColor"
          />
        ))}
      </div>

      <p className="mt-3 flex items-center gap-2 text-sm text-SecondaryColor">
        <GoLock aria-hidden="true" />
        We show your age, never your birthday.
      </p>
    </div>
  );
};

export default BirthdayInput;
