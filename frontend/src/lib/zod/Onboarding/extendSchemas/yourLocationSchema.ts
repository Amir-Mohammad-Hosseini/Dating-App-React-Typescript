import z from "zod";
import onboardingSchema from "../onboardingSchema";

const yourLocationSchema = onboardingSchema.pick({location : true , gps : true})

export type YourLocationFormType = z.infer<typeof yourLocationSchema>

export default yourLocationSchema