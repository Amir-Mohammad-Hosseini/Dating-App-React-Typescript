import * as z from "zod"
const loginSchema = z.object({
    username : z.string().min(1 , "Email is required"),
    password : z.string().min(8 , "Password should be at least 8 characters").regex(/[A-Z]/ , "Password must contain at least one uppercase letter").regex(/[0-9]/ ,"Password must contain at least one number").regex(/[^a-zA-Z0-9]/ ,"Password must contain at least one special character")
})

export type LoginFormType = z.infer<typeof loginSchema>

export default loginSchema