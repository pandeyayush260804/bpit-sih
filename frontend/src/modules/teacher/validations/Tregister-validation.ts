import { z } from "zod";

export const TregisterSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),

  password: z
    .string()
    .min(8, "Minimum 8 characters required")
    .max(16, "Password must not exceed 16 characters"),

  name: z
    .string()
    .min(3, "At least 3 characters required")
    .max(20, "Name must not exceed 20 characters"),

  department: z
    .string()
    .min(2, "Department is required")
    .max(15, "Department name too long"),
  
    subject: z
    .string()
    .min(2, "Subject is required")
    .max(20, "Subject name too long"),
});

export type TRegisterSchema = z.infer<typeof TregisterSchema>;
