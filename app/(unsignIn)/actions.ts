"use server";

import { z } from "zod";
import Users from "../repositories/users";

export const registerSchema = z.object({
  name: z.string().optional(),
  email: z.email(),
  password: z
    .string()
    .min(4)
    .regex(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$"), {
      message:
        "Password must be at least 8 characters and contain an uppercase letter, lowercase letter, and number",
    }),
});

export const register = async (formData: z.infer<typeof registerSchema>) => {
  const validation = registerSchema.safeParse(formData);

  if (!validation.success) return validation.error;

  try {
    await Users.createUser(validation.data);
  } catch (err) {
    console.log(err);
  }
};
