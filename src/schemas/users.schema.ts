import { z } from "zod";
import { CreateUserReturn } from "../interfaces/users.interface";

export const UserSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(50),
  email: z.string().max(50).email(),
  password: z.string().max(120),
  admin: z.boolean().default(false)
});

export const CreateUserSchema = UserSchema.omit({ id: true }).partial({ admin: true });
export const CreateUserSchemaReturn = UserSchema.omit({ password: true });
export const ReadUserSchema = CreateUserSchemaReturn.array();