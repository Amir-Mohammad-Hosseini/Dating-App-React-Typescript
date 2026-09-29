import type { Control, FieldValues, Path } from "react-hook-form";

export default interface InputType {
  text: string;
  name: string;
  type: string;
  isForgotPassword?: boolean;
  placeholder: string;
  error?: string;
}
export interface RangeInputType {
  text: string;
  name: string;
  min: number;
  max: number;
  extraDescription: string;
  defaultValue?: string;
}

export interface RadioInputType {
  options: string[];
  text: string;
  className?: string;
}

export interface TextareaInputType {
  text: string;
  extraDescription?: string;
  name?: string;
  error?: string;
}
export interface CheckboxInputType {
  text: string;
  extraDescription?: string;
  name?: string;
  className?: string;
  options: string[];
  error ?: string
}

type Option = { label: string; value: string };
export interface AboutRadioInputType {
  text: string;
  name: string;
  options: Option[];
  error?: string;
}

export type Birthday = { day: string; month: string; year: string };

export interface BirthdayInputType<T extends FieldValues = FieldValues> {
  name: Path<T>;
  control: Control<T>;
  error?: string;
}
