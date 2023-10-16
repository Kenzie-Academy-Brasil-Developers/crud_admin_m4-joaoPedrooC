import { z } from 'zod';
import { CreateUserSchema, CreateUserSchemaReturn, UserSchema, ReadUserSchema } from '../schemas/users.schema';

export type User = z.infer<typeof UserSchema>;
export type CreateUser = z.infer<typeof CreateUserSchema>;
export type CreateUserReturn = z.infer<typeof CreateUserSchemaReturn>;
export type ReadUserReturn = z.infer<typeof ReadUserSchema>;