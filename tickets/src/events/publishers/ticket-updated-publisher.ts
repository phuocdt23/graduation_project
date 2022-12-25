import { Publisher, Subjects, TicketUpdatedEvent } from "@phuoc.dt182724/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
