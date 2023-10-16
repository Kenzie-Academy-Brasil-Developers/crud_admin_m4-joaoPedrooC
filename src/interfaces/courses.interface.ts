import { z } from 'zod';
import { CourseSchema, CreateCourseSchema, ListCourseUsersSchema } from '../schemas/courses.schema';

export type Course = z.infer<typeof CourseSchema>;
export type CreateCourse = z.infer<typeof CreateCourseSchema>;
export type CourseArray = Array<Course>;
export type ListCourseUsers = z.infer<typeof ListCourseUsersSchema>;