
import cookieSession from 'cookie-session';
import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

import { errorHandler, NotFoundError } from '@phuoc.dt182724/common';


const app = express();

app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
  signed: false,
  secure: true
}));

app.all('*', async (req, res) => {
  throw new NotFoundError();
});
//error handling:
app.use(errorHandler);

export { app };