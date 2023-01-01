import { Message } from "node-nats-streaming";
import { Subjects, Listener, TicketCreatedEvent } from "@phuoc.dt182724/common";
import { Ticket } from "../../models/ticket";
import { queueGroupName } from "./queue-group-name";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    const { id, title, price, ownerId } = data;


    const ticket = Ticket.build({
      id,
      title,
      price,
      ownerId: ownerId,
    });
    await ticket.save();

    msg.ack();
  }
}
