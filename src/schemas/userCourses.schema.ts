import { z } from "zod";

export const UserCourseSchema = z.object({
  courseId: z.number().positive(),
  courseName: z.string().max(15),
  courseDescription: z.string(),
  userActiveInCourse: z.boolean(),
  userId: z.number().positive(),
  userName: z.string().max(50)
});