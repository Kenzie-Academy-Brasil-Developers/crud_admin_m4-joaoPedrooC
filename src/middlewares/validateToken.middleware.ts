import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/App.error";
import { verify } from "jsonwebtoken";

export const validateTokenMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const { authorization } = req.headers;

  if(!authorization) {
    throw new AppError('Missing bearer token', 401);
  }

  const [_bearer, token] = authorization.split(" ");

  const decoded = verify(token, process.env.SECRET_KEY!);

  res.locals = { ...res.locals, decoded };

  return next();
}