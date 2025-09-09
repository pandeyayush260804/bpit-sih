import {z} from 'zod';
export const registerSchema=z.object({
    email : z.string().min(1, "Email is required").email("Please enter a valid email"),
    password : z.string().min(8, "Minimum 8 characters required").max(16,"Paswword must not cross 16 characters"),
    name : z.string().min(3, "Atleast 3 characters ").max(20,"Name must cross 20 characters")
})
export type RegisterSchema=z.infer<typeof registerSchema>