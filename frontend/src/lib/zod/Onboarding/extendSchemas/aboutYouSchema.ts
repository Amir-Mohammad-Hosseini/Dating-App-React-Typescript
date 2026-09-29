import z from "zod";
import onboardingSchema from "../onboardingSchema";

const aboutYouSchema = onboardingSchema.pick({gender : true , sexual_pref : true , age : true})

export type AboutYouFormType = z.infer<typeof aboutYouSchema>

export default aboutYouSchema