import { z } from "zod";

export const createUserValidationSchema = z.object({
  name: z
    .string("Name is required")
    .min(3, "Name must be at least 3 characters"),
  email: z.email("Email is required"),
  username: z
    .string("username is required")
    .min(3, "Username must be at least 3 characters"),
  password: z
    .string("Password is required")
    .min(6, "Password must be at least 6 characters"),
});
export const loginValidationSchema = z.object({
  emailOrUsername: z
    .string("Email or Username is required")
    .nonempty("Email or Username is required"),
  password: z
    .string("Password is required")
    .min(6, "Password must be at least 6 characters"),
});
