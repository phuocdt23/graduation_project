import { randomBytes } from 'crypto';
import nats, { Message } from 'node-nats-streaming';

console.clear();
const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222',
});


stan.on('connect',
  () => {
    console.log('Listener connected NATS!');

    const subscription = stan.subscribe('ticket:created', 'order-service-queue-group');


    subscription.on('message', (msg: Message) => {
      console.log(`Received event #${msg.getSequence()} with data: ${msg.getData()}`);
    })
  })
