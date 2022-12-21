import { Subjects, Publisher, OrderCancelledEvent } from "@phuoc.dt182724/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
