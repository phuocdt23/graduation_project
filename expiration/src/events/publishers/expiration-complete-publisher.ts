import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from "@phuoc.dt182724/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
