import * as z from "zod"

const signupSchema = z
  .object({
    username: z
      .string()
      .min(4, "Username has to be at least 4 characters")
      .max(25, "Username can be at most 25 characters")
      .regex(/^[a-z0-9]+$/i, "Username should only include letters (a-z) and numbers (0-9)"),

    firstname: z
      .string()
      .min(1, "First name is required")
      .max(50, "First name can be at most 50 characters")
      .regex(/^[a-zåäö-]+$/i, "First name can only include letters, å, ä, ö, and hyphen (-)"),

    lastname: z
      .string()
      .min(1, "Last name is required")
      .max(50, "Last name can be at most 50 characters")
      .regex(/^[a-zåäö-]+$/i, "Last name can only include letters, å, ä, ö, and hyphen (-)"),

    email: z
      .string()
      .min(1, "Email is required")
      .max(254, "Email is too long")
      .regex(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        "Please enter a valid email address",
      ),

    password: z
      .string()
      .min(8, "Password should be at least 8 characters")
      .max(30, "Password can be at most 30 characters")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[!.@#$%^&*]/, "Password must contain at least one special character (!.@#$%^&*)"),

    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export type SignupFormType = z.infer<typeof signupSchema>

export default signupSchema