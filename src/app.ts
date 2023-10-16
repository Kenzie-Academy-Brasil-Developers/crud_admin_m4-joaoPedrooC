import 'express-async-errors';
import 'dotenv/config';
import express, { Application, json } from 'express'
import { routes } from './routes'
import { handleErrors } from './middlewares/handleErrors.middleware';

const app: Application = express()
app.use(json())

app.use('/', routes);

app.use(handleErrors);

export default app
