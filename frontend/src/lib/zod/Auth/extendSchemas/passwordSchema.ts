import type z from "zod";
import { signupBaseSchema } from "../signupSchema";

const passwordSchema = signupBaseSchema.pick({password : true , confirmPassword : true})

export type PasswordSchemaType = z.infer<typeof passwordSchema>

export default passwordSchema