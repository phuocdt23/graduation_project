import { TicketCreatedPublisher } from '../events/publishers/ticket-created-publisher';
import { body } from 'express-validator';
import express, { Response, Request } from 'express';
import { requireAuth, validateRequest } from '@phuoc.dt182724/common';
import { Ticket } from '../../models/ticket';
import { natsWrapper } from '../nats-wrapper';
const router = express.Router()

router.post('/api/tickets',
  requireAuth,
  [
    body('title').trim()
      .not()
      .isEmpty()
      .withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be a number and greater than 0'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const ticket = Ticket.build({ title, price, userId: req.currentUser!.id });
    await ticket.save();


    await new TicketCreatedPublisher(natsWrapper.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
    });
    return res.status(201).send(ticket);
  })


export { router as createTicketRouter };

