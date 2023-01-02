import { Message } from "node-nats-streaming";
import { Subjects, Listener, TicketCreatedEvent } from "@phuoc.dt182724/common";
import { Ticket } from "../../models/ticket";
import { queueGroupName } from "./queue-group-name";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    const { id, title, price, userId } = data;

    const ticket = Ticket.build({
      id,
      title,
      price,
      userId,
    });
    await ticket.save();

    msg.ack();
  }
}
