import dotenv from 'dotenv';
import superagent from 'superagent';
import { describe, expect, it } from 'vitest';

dotenv.config();

const url = `http://localhost:${process.env.PORT}`;

describe('Register and Login User', () => {
  it('/login (POST)', async () => {
    const res = await superagent.post(`${url}/login`).send({
      username: 'admin',
      password: '123456',
    });

    expect(res.status).toBe(200);

    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('token');
    expect(res.body.token).to.be.an('string');
  });
});
