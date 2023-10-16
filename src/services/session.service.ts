import { sign } from "jsonwebtoken";
import { QueryResult } from "pg";
import { client } from "../database";
import { AppError } from "../errors/App.error";
import { User } from "../interfaces/users.interface";
import { SessionLogin, SessionLoginReturn } from "../interfaces/session.interface";
import { compare } from "bcryptjs";

export const loginService = async (payload: SessionLogin): Promise<SessionLoginReturn> => {
  const { email, password } = payload;
  
  const query: QueryResult<User> = await client.query(`
  SELECT * FROM "users" WHERE "email" = $1;
  `, [email]);
  
  if(!query.rowCount) {
    throw new AppError('Wrong email/password', 401);
  }
  
  const user = query.rows[0];

  const checkPassword = await compare(password, user.password);

  if(!checkPassword) {
    throw new AppError('Wrong email/password', 401);
  }

  const token: string = sign({ admin: user.admin }, process.env.SECRET_KEY!, { expiresIn: process.env.EXPIRES_IN!, subject: String(user.id) });

  return { token };
}