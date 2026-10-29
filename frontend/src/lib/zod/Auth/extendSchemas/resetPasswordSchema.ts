import type z from "zod";
import { signupBaseSchema } from "../signupSchema";

const resetPasswordSchema = signupBaseSchema.pick({password : true , confirmPassword : true})

export type ResetPasswordFormType = z.infer<typeof resetPasswordSchema>

export default resetPasswordSchema