export const GENDER_VALUES = ["male", "female", "other"] as const;

export const SEXUAL_PREF_VALUES = [
  "male",
  "female",
  "bisexual",
] as const;

export type Gender = (typeof GENDER_VALUES)[number];
export type SexualPref = (typeof SEXUAL_PREF_VALUES)[number];