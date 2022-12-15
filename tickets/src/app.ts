// import { errorHandler, NotFoundError, currentUser } from './../../common/src/index';

import cookieSession from 'cookie-session';
import express, { Request, Response } from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { errorHandler, NotFoundError, currentUser } from '@phuoc.dt182724/common';

import { createTicketRouter } from './routes/create-ticket';

const app = express();

app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
  signed: false,
  secure: true
}));

app.use(currentUser);
app.use(createTicketRouter);

app.all('*', async (req: Request, res: Response) => {
  throw new NotFoundError();
});
//error handling:
app.use(errorHandler);

export { app };