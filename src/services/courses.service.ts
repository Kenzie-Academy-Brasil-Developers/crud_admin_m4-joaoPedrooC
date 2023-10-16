import format from "pg-format";
import { Course, CourseArray, CreateCourse, ListCourseUsers } from "../interfaces/courses.interface";
import { client } from "../database";
import { QueryResult } from "pg";

export const createCourseService = async (payload: CreateCourse): Promise<Course> => {
  const queryString = format(`
    INSERT INTO "courses" (%I) VALUES (%L)
    RETURNING *;
  `,
  Object.keys(payload),
  Object.values(payload));

  const query: QueryResult<Course> = await client.query(queryString);

  return query.rows[0];
}

export const readCoursesService = async (): Promise<CourseArray> => {
  const query: QueryResult<Course> = await client.query(`
    SELECT * FROM "courses";
  `);

  return query.rows;
}

export const applyUserIntoCourseService = async (courseId: number, userId: number): Promise<void> => {
  const queryString = `
    INSERT INTO "userCourses" ("userId", "courseId")
    VALUES ($1, $2);
  `;

  await client.query(queryString, [userId, courseId]);
}

export const inactiveUserFromCourseService = async (courseId: number, userId: number): Promise<void> => {
  const queryString = `
    UPDATE "userCourses" SET "active" = false WHERE "courseId" = $1 AND "userId" = $2;
  `;

  await client.query(queryString, [courseId, userId]);
}

export const readAllUsersFromCourseService = async (courseId: number): Promise<ListCourseUsers[]> => {
  const queryString = `
    SELECT "u"."id" AS "userId", "u"."name" AS "userName",
    "c"."id" AS "courseId", "c"."name" AS "courseName",
    "c"."description" AS "courseDescription", "uc"."active" AS "userActiveInCourse"
    FROM "users" AS "u" JOIN "userCourses" AS "uc" ON "uc"."userId" = "u"."id"
    JOIN "courses" AS "c" ON "c"."id" = "uc"."courseId"
    WHERE "uc"."courseId" = $1;
  `;

  const query: QueryResult<ListCourseUsers> = await client.query(queryString, [courseId]);

  return query.rows;
}