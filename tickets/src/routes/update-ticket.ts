import { natsWrapper } from './../nats-wrapper';
import { NotFoundError, requireAuth, UnauthorizedError, validateRequest } from '@phuoc.dt182724/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Ticket } from '../../models/ticket';
import { TicketUpdatedPublisher } from '../events/publishers/ticket-updated-publisher';

const router = express.Router();

router.put('/api/tickets/:id',
  requireAuth,
  [
    body('title')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be provided and must be greater than 0'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { price, title } = req.body;
    const ticket = await Ticket.findById(id);
    if (!ticket) {
      throw new NotFoundError();
    }

    if (req.currentUser!.id !== ticket.userId) {
      throw new UnauthorizedError();
    }

    ticket.set({ title, price });
    await ticket.save();

    await new TicketUpdatedPublisher(natsWrapper.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
    })


    res.status(200).send(ticket);
  }
)


export { router as updateTicket }
