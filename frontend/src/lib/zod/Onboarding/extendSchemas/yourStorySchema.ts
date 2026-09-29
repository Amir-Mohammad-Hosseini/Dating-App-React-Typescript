import z from "zod";
import onboardingSchema from "../onboardingSchema";

const yourStorySchema = onboardingSchema.pick({ biography : true , tags : true})

export type YourStoryFormType = z.infer<typeof yourStorySchema>

export default yourStorySchema