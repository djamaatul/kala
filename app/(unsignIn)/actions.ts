"use server";

import { z } from "zod";
import Users from "../repositories/users";

const registerSchema = z.object({
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

export const register = async (formData: FormData) => {
  const validation = registerSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validation.success) return validation.error;

  await Users.createUser(validation.data);
};
