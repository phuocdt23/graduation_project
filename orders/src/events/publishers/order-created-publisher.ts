import { Publisher, OrderCreatedEvent, Subjects } from "@phuoc.dt182724/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
