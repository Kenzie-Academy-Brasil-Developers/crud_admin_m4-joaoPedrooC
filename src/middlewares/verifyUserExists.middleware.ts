import { NextFunction, Request, Response } from "express";
import { client } from "../database";
import { AppError } from "../errors/App.error";

export const verifyUserExistsMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const query = await client.query(`
    SELECT * FROM "users" WHERE id = $1
  `, [req.params.userId]);

  if(!query.rowCount) {
    throw new AppError('User/course not found', 404);
  }

  return next();
}