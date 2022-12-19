import { Subjects, TicketCreatedEvent } from '@phuoc.dt182724/common';
import { Message } from "node-nats-streaming";
import { Listener } from "../../../common/src/events/base-listener";

export class CreateTicketListner extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated
  queueGroupName = 'payments-service';

  onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    console.log('Event data!', data);

    msg.ack();
  }
}