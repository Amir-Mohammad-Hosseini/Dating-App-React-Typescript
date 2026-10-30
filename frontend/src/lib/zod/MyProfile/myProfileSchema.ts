import * as z from "zod";
import { signupBaseSchema } from "../Auth/signupSchema";
import onboardingSchema from "../Onboarding/onboardingSchema";

const myProfileSchema = signupBaseSchema
  .pick({ firstname: true, lastname: true })
  .extend(
    onboardingSchema.pick({
      gender: true,
      biography: true,
      age: true,
      location: true,
      sexual_pref: true,
    }).shape,
  );

export type MyProfileSchemaType = z.infer<typeof myProfileSchema>;

export type MyProfileFormType = MyProfileSchemaType & {
  username: string;
  email: string;
  tags: string[];
  gps_lat: number | null;
  gps_lon: number | null;
};

export default myProfileSchema;
