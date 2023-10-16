import { Router } from "express";
import { userRoutes } from "./userRoutes.route";
import { courseRoutes } from "./courseRoutes.route";
import { sessionRoutes } from "./sessionRoutes.route";

export const routes = Router();

routes.use('/users', userRoutes);
routes.use('/login', sessionRoutes);
routes.use('/courses', courseRoutes);