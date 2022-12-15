// import { errorHandler, NotFoundError, currentUser } from './../../common/src/index';

import cookieSession from 'cookie-session';
import express, { Request, Response } from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { errorHandler, NotFoundError, currentUser } from '@phuoc.dt182724/common';

import { createTicketRouter } from './routes/create-ticket';
import { showTicket } from './routes/show-ticket';
import { updateTicket } from './routes/update-ticket';

const app = express();

app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
  signed: false,
  secure: true
}));
//get current user middleware
app.use(currentUser);

app.use(createTicketRouter);
app.use(showTicket);
app.use(updateTicket);


app.all('*', async (req: Request, res: Response) => {
  throw new NotFoundError();
});
//error handling:
app.use(errorHandler);

export { app };