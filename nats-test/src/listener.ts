import { randomBytes } from 'crypto';
import nats, { Message, Stan } from 'node-nats-streaming';
import { CreateTicketListner } from './event/ticket-created-listener';


console.clear();
const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('Listener connected! to NATS');

  stan.on('close', () => {
    console.log('NATS connection closed!');
  })
  new CreateTicketListner(stan).listen();
});


