import express, { Request, Response } from "express";
import {
  validateRequest,
  NotFoundError,
  requireAuth,
  NotAuthorizedError,
} from "@phuoc.dt182724/common";
import { Ticket } from "../models/ticket";

const router = express.Router();

router.delete(
  "/api/tickets/:id",
  requireAuth,
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      throw new NotFoundError();
    }

    if (ticket.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    const rs = await ticket.remove();
    res.send({ message: 'removed ticket #' + rs.id + ' successfully' });
  }
);

export { router as deleteTicketRouter };
