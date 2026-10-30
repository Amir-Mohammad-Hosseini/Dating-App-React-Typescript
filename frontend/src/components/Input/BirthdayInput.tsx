import { Controller } from "react-hook-form";
import type {
  FieldValues,
} from "react-hook-form";
import BirthdayField from "./BirthdayField";
import type { BirthdayInputType } from "./types";

const BirthdayInput = <T extends FieldValues>({
  name,
  control,
  error,
}: BirthdayInputType<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => <BirthdayField field={field} error={error} />}
  />
);

export default BirthdayInput;
