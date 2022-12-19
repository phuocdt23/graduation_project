import { Subjects } from "./subject";

export interface TicketCreatedEvent {
  name: string;
  type: Subjects.TicketCreated;
  data: {
    id: string;
    title: string;
    price: number;
  }
}