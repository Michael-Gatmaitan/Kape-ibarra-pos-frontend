import { z } from "zod";

// Signup schema
export const signupSchema = z
  .object({
    firstname: z.string().min(1, "Firstname required."),
    lastname: z.string().min(1, "Lastname required."),
    username: z.string().min(5, "Username must be at least 5 characters"),
    password: z.string().min(10, "Password is must be at least 10 characters"),
    roleName: z.string(),
    confirmPassword: z.string().min(10, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password must match",
    path: ["confirmPassword"],
  });

export type TSignupSchema = z.infer<typeof signupSchema>;

// Login shcema
export const loginSchema = z.object({
  username: z.string().min(5, "Username must be atleast 5 characters"),
  password: z.string().min(10, "Password must be at least 10 characters"),
});

export type TLoginSchema = z.infer<typeof loginSchema>;

// Branch schema
export const branchSchema = z.object({
  region: z.string(),
  province: z.string(),
  city: z.string(),
  zipCode: z.string(),
  baranggay: z.string(),
  streetAddress: z.string(),
  contactNumber: z.string().min(11, "Minimum number length is 11 characters."),
});

export type TBranchSChema = z.infer<typeof branchSchema>;
