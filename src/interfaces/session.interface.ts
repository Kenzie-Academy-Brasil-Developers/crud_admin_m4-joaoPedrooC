import { z } from "zod";
import { sessionSchema } from "../schemas/session.schema";

export type SessionLogin = z.infer<typeof sessionSchema>;
export type SessionLoginReturn = { token: string };