import { TicketCreatedEvent, Publisher, Subjects } from "@phuoc.dt182724/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
