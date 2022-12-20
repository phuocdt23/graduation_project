import { Message } from 'node-nats-streaming';
import { Listener, Subjects, TicketCreatedEvent } from "@phuoc.dt182724/common";

// export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
//   readonly subject = Subjects.TicketCreated;

//   onMessage(data: TicketCreatedEvent['data'], msg: Message): void {
// }