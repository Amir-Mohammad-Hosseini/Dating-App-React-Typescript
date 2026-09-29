import * as z from "zod";

const onboardingSchema = z.object({
  gender: z.enum(["male", "female", "other"]),
  sexual_pref: z.enum(["male", "female", "bisexual"]),
  age: z.number().min(18).max(120),
  biography: z.string().max(500),
  tags: z
    .array(z.string())
    .min(2, "Please select at least 2 interests")
    .max(8, "You can select up to 8 interests"),
  location: z
    .string()
    .max(50)
    .regex(/^[a-z, åäö-]+$/i, "Only letters, comma and hyphen allowed"),
  gps: z.tuple([z.number().min(-90).max(90), z.number().min(-180).max(180)]),
});

export type OnboardingFormType = z.infer<typeof onboardingSchema>;
export default onboardingSchema;
