import type z from "zod";
import { signupBaseSchema } from "../signupSchema";

const forgotPasswordSchema = signupBaseSchema.pick({email : true})

export type ForgotPasswordFormType = z.infer<typeof forgotPasswordSchema>

export default  forgotPasswordSchema