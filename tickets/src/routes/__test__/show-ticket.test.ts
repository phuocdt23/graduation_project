// import mongoose from 'mongoose';
// import request from 'supertest';
// import { app } from "../../app";
// import { faker } from '@faker-js/faker';

// const createTicket = async () => {
//   await request(app)
//     .post('/api/tickets')
//     .set('Cookie', global.signin())
//     .send({
//       title: faker.commerce.productName(),
//       price: faker.commerce.price(),
//     })
// }

// it('should have a route handler for showing all tickets', async () => {
//   const response = await request(app)
//     .get('/api/tickets')
//   expect(response.status).not.toEqual(404);
// })

// it('should return all avaible tickets', async () => {
//   await Promise.all([
//     createTicket(),
//     createTicket(),
//     createTicket(),
//   ])
//   const response = await request(app)
//     .get('/api/tickets')
//     .expect(200);

//   expect(response.body.length).toEqual(3);
// })

// it('returns a 404 if the ticket is not found', async () => {
//   const id = new mongoose.Types.ObjectId().toHexString();
//   const response = await request(app)
//     .get(`/api/tickets/${id}`)
//     .send();

//   expect(response.status).toEqual(404);
// })

// it('return a ticket if the ticket is found', async () => {
//   const { body: { userId, id: ticketId, price, title } } = await request(app)
//     .post('/api/tickets')
//     .set('Cookie', global.signin())
//     .send({
//       title: 'test ticket',
//       price: 12,
//     })
//     .expect(201);

//   const response = await request(app)
//     .get(`/api/tickets/${ticketId}`);

//   expect(response.status).toEqual(200);
//   expect(response.body.ticket.title).toEqual(title);
//   expect(response.body.ticket.price).toEqual(price);
//   expect(response.body.ticket.userId).toEqual(userId);

// })

