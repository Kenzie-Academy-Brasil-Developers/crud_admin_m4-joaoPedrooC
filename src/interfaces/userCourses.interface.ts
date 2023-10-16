import { z } from "zod";
import { UserCourseSchema } from "../schemas/userCourses.schema";

export type UserCourse = z.infer<typeof UserCourseSchema>;
export type UserCourseArray = Array<UserCourse>;