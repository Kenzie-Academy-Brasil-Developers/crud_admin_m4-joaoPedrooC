import { loginService } from "../services/session.service";
import { Request, Response } from 'express';

export const loginController = async (req: Request, res: Response): Promise<Response> => {
  const queryResult = await loginService(req.body);

  return res.status(200).json(queryResult);
}