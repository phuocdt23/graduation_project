import { Publisher, Subjects } from '@phuoc.dt182724/common';
import { TicketUpdatedEvent } from '@phuoc.dt182724/common';
export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}