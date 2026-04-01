import z from "zod";

export const LoginSchema = z.object({
  email: z
    .email({ error: "Enter a valid email" })
    .nonempty({ error: "Email is required" }),
  password: z.string().nonempty({ error: "Password is required" }),
});

export const RegisterSchema = z.object({
  name: z.string().nonempty({ error: "Name is required" }),
  email: z
    .email({ error: "Enter a valid email" })
    .nonempty({ error: "Email is required" }),
  password: z
    .string()
    .nonempty({ error: "Password is required" })
    .regex(/[A-Z]/, { error: "Must contain at least one uppercase letter" })
    .regex(/[a-z]/, { error: "Must contain at least one lowercase letter" })
    .min(6, { error: "Password must be at least 6 characters long" }),
});

export type LoginInput = z.infer<typeof LoginSchema>;
export type RegisterInput = z.infer<typeof RegisterSchema>;
