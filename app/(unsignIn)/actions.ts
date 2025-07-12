"use server";

import { z } from "zod";
import Users from "../repositories/users";
import { query } from "../lib/db";

const user = new Users(query);

const registerSchema = z.object({
  name: z.string().optional(),
  email: z.email(),
  password: z.string(),
});

export const register = async (formData: z.infer<typeof registerSchema>) => {
  const validation = registerSchema.safeParse(formData);

  if (!validation.success) return validation.error;

  try {
    await user.createUser(validation.data);
  } catch (err) {
    console.log(err);
  }
};
