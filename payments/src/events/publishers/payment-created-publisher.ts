import { Subjects, Publisher, PaymentCreatedEvent } from "@phuoc.dt182724/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
