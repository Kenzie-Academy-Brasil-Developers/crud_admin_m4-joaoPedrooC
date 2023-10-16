import { Router } from "express";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware";
import { CreateCourseSchema } from "../schemas/courses.schema";
import { applyUserIntoCourseController, createCourseController, inactiveUserFromCourseController, readAllUsersFromCourseController, readCoursesController } from "../controllers/courses.controller";
import { validateTokenMiddleware } from "../middlewares/validateToken.middleware";
import { verifyPermissionsMiddleware } from "../middlewares/verifyPermissions.middleware";
import { verifyUserExistsMiddleware } from "../middlewares/verifyUserExists.middleware";
import { verifyCourseExistsMiddleware } from "../middlewares/verifyCourseExists.middleware";

export const courseRoutes = Router();

courseRoutes.get('/', readCoursesController);

courseRoutes.use('/', validateTokenMiddleware, verifyPermissionsMiddleware);
courseRoutes.post('/', validateBodyMiddleware(CreateCourseSchema), createCourseController);
courseRoutes.post('/:courseId/users/:userId', verifyCourseExistsMiddleware, verifyUserExistsMiddleware, applyUserIntoCourseController);
courseRoutes.delete('/:courseId/users/:userId', verifyCourseExistsMiddleware, verifyUserExistsMiddleware, inactiveUserFromCourseController);
courseRoutes.get('/:id/users', readAllUsersFromCourseController);