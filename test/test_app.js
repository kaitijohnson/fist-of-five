process.env.NODE_ENV = 'test';

const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app');
const knex = require('../knex');

describe('GET /', () => {
  it('responds with 200 status', done => {
    request(app)
      .get('/')
      .expect(200, done);
  });
});

describe('GET /dashboard/:id', () => {
  it('responds with 200 status', done => {
    request(app)
      .get('/dashboard/1')
      .expect(200, done);
  });
});

describe('GET /signup', () => {
  it('responds with 200 status', done => {
    request(app)
      .get('/signup')
      .expect(200, done);
  });
});

describe('GET /login', () => {
  it('responds with 200 status', done => {
    request(app)
      .get('/login')
      .expect(200, done);
  });
});

describe('GET /session/id', () => {
  it('responds with 200 status', done => {
    request(app)
      .get('/session/1')
      .expect(200, done);
  });
});

xdescribe('POST /', () => {});

xdescribe('PUT //:id', () => {});

xdescribe('DELETE //:id', () => {});
