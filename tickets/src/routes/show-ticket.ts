import { NotFoundError, BadRequestError } from '@phuoc.dt182724/common';
import express, { Request, Response } from "express";
import { Ticket } from "../../models/ticket";


const route = express.Router();

route.get("/api/tickets", async (req, res) => {
  const tickets = await Ticket.find({});
  res.status(200).send(tickets);
})

route.get("/api/tickets/:id", async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id);
  console.log('ticket: ', ticket);
  if (!ticket) {
    throw new NotFoundError();
  }
  res.status(200).send({ ticket });
})


export { route as showTicket };