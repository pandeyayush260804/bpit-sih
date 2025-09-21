import { z } from "zod";

export const TloginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),

  password: z
    .string()
    .min(8, "Minimum 8 characters required")
    .max(16, "Password must not exceed 16 characters"),
});

export type TLoginrSchema = z.infer<typeof TloginSchema>;
