import format from "pg-format";
import { CreateUser, CreateUserReturn, ReadUserReturn, User } from "../interfaces/users.interface";
import { client } from "../database";
import { hash } from 'bcryptjs';
import { CreateUserSchemaReturn, ReadUserSchema } from "../schemas/users.schema";
import { QueryResult } from "pg";
import { UserCourse, UserCourseArray } from "../interfaces/userCourses.interface";
import { AppError } from "../errors/App.error";

export const createUserService = async (payload: CreateUser): Promise<CreateUserReturn> => {
  payload.password = await hash(payload.password, 12);

  const queryString = format(`
    INSERT INTO "users" (%I) VALUES (%L)
    RETURNING *;
  `,
  Object.keys(payload),
  Object.values(payload));

  const query = await client.query(queryString);
  
  return CreateUserSchemaReturn.parse(query.rows[0]);
}

export const readUsersService = async (): Promise<ReadUserReturn> => {
  const query: QueryResult<Array<User>> = await client.query(`
    SELECT * FROM "users";
  `);

  return ReadUserSchema.parse(query.rows);
}

export const readUserCoursesService = async (userId: number): Promise<Array<UserCourseArray>> => {
  const queryString = `
    SELECT "c"."id" AS "courseId", "c"."name" AS "courseName",
    "c"."description" AS "courseDescription", "uc"."active" AS "userActiveInCourse",
    "u"."id" AS "userId", "u"."name" AS "userName"
    FROM "users" AS "u" JOIN "userCourses" AS "uc"
    ON "u"."id" = "uc"."userId" JOIN "courses" AS "c"
    ON "uc"."courseId" = "c"."id"
    WHERE "u"."id" = $1;
  `;

  const query: QueryResult<UserCourseArray> = await client.query(queryString, [userId]);

  if(!query.rowCount) {
    throw new AppError('No course found', 404);
  }

  return query.rows;
}