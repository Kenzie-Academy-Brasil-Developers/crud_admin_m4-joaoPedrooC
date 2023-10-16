import { Router } from "express";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware";
import { createUserController, readUserCoursesController, readUsersController } from "../controllers/users.controller";
import { CreateUserSchema } from "../schemas/users.schema";
import { validateEmailMiddleware } from "../middlewares/validateEmail.middleware";
import { validateTokenMiddleware } from "../middlewares/validateToken.middleware";
import { verifyPermissionsMiddleware } from "../middlewares/verifyPermissions.middleware";

export const userRoutes = Router();

userRoutes.post('/', validateBodyMiddleware(CreateUserSchema), validateEmailMiddleware, createUserController);

userRoutes.use('/', validateTokenMiddleware, verifyPermissionsMiddleware)
userRoutes.get('/', readUsersController);
userRoutes.get('/:id/courses', readUserCoursesController);