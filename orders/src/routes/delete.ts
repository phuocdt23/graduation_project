import { OrderCancelledPublisher } from './../events/publishers/order-cancelled-publisher';
import { natsWrapper } from '../nats-wrapper';
import express, { Request, Response } from "express";
import {
  requireAuth,
  NotFoundError,
  UnauthorizedError,
} from "@phuoc.dt182724/common";
import { Order, OrderStatus } from "../models/order";

const router = express.Router();

router.delete(
  "/api/orders/:orderId",
  requireAuth,
  async (req: Request, res: Response) => {
    const { orderId } = req.params;

    const order = await Order.findById(orderId).populate('ticket');

    if (!order) {
      throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
      throw new UnauthorizedError();
    }
    order.status = OrderStatus.Cancelled;
    await order.save();

    // publishing an event saying this was cancelled!
    await new OrderCancelledPublisher(natsWrapper.client).publish({
      id: order.id,
      ticket: {
        id: order.ticket.id,
      }
    })

    res.status(204).send(order);
  }
);

export { router as deleteOrderRouter };
