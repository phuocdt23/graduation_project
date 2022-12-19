import { Message, Stan } from "node-nats-streaming";
import { Subjects } from "./subject";
interface Event {
  type: Subjects,
  data: any
}

export abstract class Listener<T extends Event> {
  private client: Stan;
  abstract queueGroupName: string;
  abstract subject: T['type'];
  abstract onMessage(data: T['data'], msg: Message): void;
  protected ackWait = 5 * 1000;

  constructor(client: Stan) {
    this.client = client;
  }

  subcriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroupName);
  }

  listen() {
    const subscription = this.client.subscribe(this.subject, this.queueGroupName, this.subcriptionOptions())

    subscription.on('message', (msg: Message) => {
      console.log(
        `Received message: ${this.subject} / ${this.queueGroupName}`
      )
      const parsedData = this.parserMessage(msg);
      this.onMessage(parsedData, msg)
    });
  }

  parserMessage(msg: Message) {
    const data = msg.getData();
    return typeof data === 'string'
      ? JSON.parse(data)
      : JSON.parse(data.toString('utf8'));
  }
}