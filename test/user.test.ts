import dotenv from 'dotenv';
import superagent from 'superagent';
import { describe, expect, it } from 'vitest';

dotenv.config();

const url = `http://localhost:${process.env.PORT}`;

describe('Get User Data', () => {
  let token = '';

  it('/login (POST)', async () => {
    const res = await superagent.post(`${url}/login`).send({
      username: 'admin',
      password: '123456',
    });

    expect(res.status).toBe(200);

    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('token');
    expect(res.body.token).to.be.an('string');

    token = res.body.token;
  });

  it('/user (GET)', async () => {
    const res = await superagent
      .get(`${url}/user`)
      .auth(token, { type: 'bearer' });

    expect(res.status).toBe(200);

    expect(res.body).to.be.an('array');
    expect(res.body[0]).to.be.an('object');

    expect(res.body[0]).to.have.property('id');
    expect(res.body[0].id).to.be.an('string');
  });
});
