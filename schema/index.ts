import * as z from "zod";

export const loginSchema = z.object({
  username: z.string().min(5, "Minimum of 5 characters required."),
  password: z.string().min(8, "Minimum of 8 characters required."),
});
