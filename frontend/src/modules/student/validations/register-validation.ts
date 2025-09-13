import { z } from 'zod';

export const registerSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),

  password: z
    .string()
    .min(8, "Minimum 8 characters required")
    .max(16, "Password must not cross 16 characters"),

  name: z
    .string()
    .min(3, "At least 3 characters")
    .max(20, "Name must not cross 20 characters"),

  class: z
    .string()
    .min(5, "Like CSE-B")
    .max(5, "Like CSE-B"),

  year: z
    .string()
    .min(1, "Year is required")
    .regex(/^[1-4]$/, "Year must be between 1 and 4"), // adjust based on your college year system

  rollNo: z
    .string()
    .min(1, "Roll number is required")
    .max(15, "Roll number too long"), // adjust max length as needed

  branch: z
    .string()
    .min(2, "Branch is required")
    .max(10, "Branch name too long") // adjust based on your branch naming
});

export type RegisterSchema = z.infer<typeof registerSchema>;
