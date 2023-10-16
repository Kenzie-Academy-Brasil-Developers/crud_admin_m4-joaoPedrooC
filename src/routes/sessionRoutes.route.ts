import { Router } from "express";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware";
import { sessionSchema } from "../schemas/session.schema";
import { loginController } from "../controllers/session.controller";

export const sessionRoutes = Router();

sessionRoutes.post('/', validateBodyMiddleware(sessionSchema), loginController);