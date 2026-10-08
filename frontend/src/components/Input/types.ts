import type { ComponentPropsWithoutRef } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";
import type { DiscoverFilters } from "../../utils/constants/discover";

export default interface InputType {
  text: string;
  name: string;
  type: string;
  isForgotPassword?: boolean;
  placeholder: string;
  error?: string;
}
export interface RangeInputType
  extends Omit<ComponentPropsWithoutRef<"input">, "type" | "min" | "max"> {
  text: string;
  name: string;
  min: number;
  max: number;
  extraDescription: string;
}
 
export interface QuickFilterOption<T = unknown> {
  label: string;
  value: T;
}

export interface RadioInputType<
  T extends QuickFilterOption = QuickFilterOption,
> {
  options: T[];
  text: string;
  className?: string;
  selectedValue?: string;
  onChange?: (option: T) => void;
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
