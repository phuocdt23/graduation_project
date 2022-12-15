import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import request from 'supertest'
import { app } from '../../app'

it('returns a 404 if the provided id is not exist'), async () => {
  await request(app)
    .put(`/api/tickets/${new mongoose.Types.ObjectId().toHexString()}`)
    .set('Cookie', global.signin())
    .send({
      title: faker.commerce.productName,
      price: faker.commerce.price
    })
    .expect(404);
}

it('returns a 401 if the user is not authenticated'), async () => {
  await request(app)
    .put(`/api/tickets/${new mongoose.Types.ObjectId().toHexString()}`)
    .send({
      title: faker.commerce.productName,
      price: faker.commerce.price
    })
    .expect(401);
}
it('returns a 401 if the user does not own the ticket'), async () => {
  // await request(app)
  //   .put(`/api/tickets/${new mongoose.Types.ObjectId().toHexString()}`)
  //   .send({
  //     title: faker.commerce.productName,
  //     price: faker.commerce.price
  //   })
  //   .expect(401);

}
it('returns a 400 if the user provides an invalid title or price'), async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: faker.commerce.productName,
      price: faker.commerce.price
    })

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: '',
      price: 20
    })
    .expect(400)

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: faker.commerce.productName,
      price: -10
    })
    .expect(400)
}
it('returns a 404 if the provided id is not exist'), async () => {
  const newTitle = 'new title';
  const newPrice = 10;
  const cookie = global.signin();

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: faker.commerce.productName,
      price: faker.commerce.price
    })

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: newTitle,
      price: newPrice
    })
    .expect(200)

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send();

  expect(ticketResponse.body.title).toEqual(newTitle)
  expect(ticketResponse.body.price).toEqual(newPrice)
}