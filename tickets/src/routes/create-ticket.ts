import express, { Response, Request } from 'express';
import { currentUser } from '@phuoc.dt182724/common';
const router = express.Router()

router.post('/api/tickets',
  (req: Request, res: Response) => {
    res.sendStatus(200);
  })


export { router as createTicketRouter };

