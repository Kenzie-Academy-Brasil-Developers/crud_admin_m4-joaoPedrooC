import { NextFunction, Request, Response } from "express";
import { client } from "../database";
import { AppError } from "../errors/App.error";

export const verifyCourseExistsMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const query = await client.query(`
    SELECT * FROM "courses" WHERE id = $1
  `, [req.params.courseId]);

  if(!query.rowCount) {
    throw new AppError('User/course not found', 404);
  }

  return next();
}