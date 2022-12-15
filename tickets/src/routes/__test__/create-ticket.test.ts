// import request from 'supertest';
// import { Ticket } from '../../../models/ticket';
// import { app } from '../../app';

// it('has a route handler listening to /api/tickets for post requests', async () => {
//   const response = await request(app)
//     .post('/api/tickets')
//     .send({});
//   expect(response.status).not.toEqual(404);
// });

// it('can only access if the user is signed in', async () => {
//   const response = await request(app)
//     .post('/api/tickets')
//     .send({});
//   expect(response.status).toEqual(401);
// });
// it('returns a status other than 401 if the user is signed in', async () => {
//   const response = await request(app)
//     .post('/api/tickets')
//     .set('Cookie', global.signin())
//     .send({});
//   expect(response.status).not.toEqual(401);
// });

// it('returns an error if an invalid title is provided', async () => {
//   await request(app)
//     .post('/api/tickets')
//     .set('Cookie', global.signin())
//     .send({
//       title: '',
//       price: 10
//     })
//     .expect(400);
//   await request(app)
//     .post('/api/tickets')
//     .set('Cookie', global.signin())
//     .send({
//       price: 10
//     })
//     .expect(400);
// });

// it('returns an error if an valid price is provided', async () => {
//   await request(app)
//     .post('/api/tickets')
//     .set('Cookie', global.signin())
//     .send({
//       title: 'asdfasdfkla',
//       price: -10
//     })
//     .expect(400);
//   await request(app)
//     .post('/api/tickets')
//     .set('Cookie', global.signin())
//     .send({
//       title: 'asdfasdfkla',
//     })
//     .expect(400);
// });

// it('create a ticket with valid inputs', async () => {
//   let title = 'ticket1', price = 12;
//   let tickets = await Ticket.find({});
//   expect(tickets.length).toEqual(0);

//   const response = await request(app)
//     .post('/api/tickets')
//     .set('Cookie', global.signin())
//     .send({
//       title,
//       price
//     })

//   tickets = await Ticket.find({});
//   expect(tickets.length).toEqual(1);
//   expect(tickets[0].title).toEqual(title);
//   expect(tickets[0].price).toEqual(price);
// });