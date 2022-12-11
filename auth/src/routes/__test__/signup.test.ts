import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async () => {

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test1@gmail.com',
      password: '123123'
    })
    .expect(201);
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test1@gmail.com',
      password: '123123'
    })
    .expect(400);
});

it('returns a 400 with an invalid email', async () => {
  request(app)
    .post('/api/users/signup')
    .send({
      email: 'test1gmail.com',
      password: '123123'
    })
    .expect(400);
});

it('returns a 400 with an invalid password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test2@gmail.com',
      password: '123'
    })
    .expect(400);
});

it('returns a 400 with missing email and password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({})
    .expect(400);
});