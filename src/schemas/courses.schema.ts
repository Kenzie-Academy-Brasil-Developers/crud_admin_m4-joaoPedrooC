import { z } from 'zod';

export const CourseSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(15),
  description: z.string()
});

export const ListCourseUsersSchema = z.object({
  userId: z.number().positive(),
  userName: z.string().max(50),
  courseId: z.number().positive(),
  courseName: z.string().max(15),
  courseDescription: z.string(),
  userActiveInCourse: z.boolean()
})

export const CreateCourseSchema = CourseSchema.omit({ id: true });