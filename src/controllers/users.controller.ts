import { Request, Response } from "express";
import { createUserService, readUserCoursesService, readUsersService } from "../services/users.service";

export const createUserController = async (req: Request, res: Response): Promise<Response> => {
  const queryResult = await createUserService(req.body);

  return res.status(201).json(queryResult);
}

export const readUsersController = async (req: Request, res: Response): Promise<Response> => {
  const queryResult = await readUsersService();

  return res.status(200).json(queryResult);
}

export const readUserCoursesController = async (req: Request, res: Response): Promise<Response> => {
  const queryResult = await readUserCoursesService(Number(req.params.id));

  return res.status(200).json(queryResult);
}