import { Request, Response } from "express";
import { applyUserIntoCourseService, createCourseService, inactiveUserFromCourseService, readAllUsersFromCourseService, readCoursesService } from "../services/courses.service";
import { ListCourseUsers } from "../interfaces/courses.interface";

export const createCourseController = async (req: Request, res: Response): Promise<Response> => {
  const queryResult = await createCourseService(req.body);

  return res.status(201).json(queryResult);
}

export const readCoursesController = async (req: Request, res: Response): Promise<Response> => {
  const queryResult = await readCoursesService();

  return res.status(200).json(queryResult);
}

export const applyUserIntoCourseController = async (req: Request, res: Response): Promise<Response> => {
  const { userId, courseId } = req.params;
  
  await applyUserIntoCourseService(Number(courseId), Number(userId));

  return res.status(201).json({ message: 'User successfully vinculed to course' });
}

export const inactiveUserFromCourseController = async (req: Request, res: Response) => {
  const { userId, courseId } = req.params;

  await inactiveUserFromCourseService(Number(courseId), Number(userId));

  return res.status(204).json();
}

export const readAllUsersFromCourseController = async (req: Request, res: Response): Promise<Response> => {
  const queryResult: ListCourseUsers[] = await readAllUsersFromCourseService(Number(req.params.id));

  return res.status(200).json(queryResult);
}