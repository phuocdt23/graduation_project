import { Publisher, Subjects, TicketCreatedEvent } from "@phuoc.dt182724/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
