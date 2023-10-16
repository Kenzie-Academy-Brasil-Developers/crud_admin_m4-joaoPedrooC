import { NextFunction, Request, Response } from "express";
import { client } from "../database";
import { AppError } from "../errors/App.error";

export const validateEmailMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const queryString = `
    SELECT * FROM "users" WHERE "email" = $1;
  `;

  const query = await client.query(queryString, [req.body.email]);

  if(query.rowCount) {
    throw new AppError('Email already registered', 409);
  }

  return next();
}