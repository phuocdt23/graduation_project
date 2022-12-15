import { body } from 'express-validator';
import express, { Response, Request } from 'express';
import { requireAuth, validateRequest } from '@phuoc.dt182724/common';
const router = express.Router()

router.post('/api/tickets',
  requireAuth,
  [
    body('title').trim()
      .not()
      .isEmpty()
      .withMessage('Title is required'),
    body('price')
      .not()
      .isEmpty()
      .withMessage('Price is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be a number'),
  ],
  validateRequest,
  (req: Request, res: Response) => {
    res.sendStatus(201);
  })


export { router as createTicketRouter };

