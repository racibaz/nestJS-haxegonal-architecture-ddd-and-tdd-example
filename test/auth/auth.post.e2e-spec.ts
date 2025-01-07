import * as request from 'supertest';

import {
  completeUser,
  missingFirstName,
  missingEmail,
  missingPassword,
} from './auth.post.e2e-spec.sample-data';

import { App } from 'supertest/types';
import { ConfigService } from '@nestjs/config';
import { INestApplication, UnauthorizedException } from '@nestjs/common';
import { bootstrapNestApplication } from '../helpers/bootstrap-nest-application.helper';
import { dropDatabase } from '../helpers/drop-database.helper';

describe('[Auth] @Post Endpoints', () => {
  let app: INestApplication;
  let config: ConfigService;
  let httpServer: App;

  beforeEach(async () => {
    // Instantiate the app
    app = await bootstrapNestApplication();
    // Get the config
    config = app.get<ConfigService>(ConfigService);
    // get server endpoint
    httpServer = app.getHttpServer();
  });

  afterEach(async () => {
    await dropDatabase(config);
    await app.close();
  });

  it('/auth/register - Endpoint is public', () => {
    return request(httpServer).post('/auth/register').send({}).expect(400);
  });

  it('/auth/register - firstName is mandatory', () => {
    return request(httpServer)
      .post('/auth/register')
      .send(missingFirstName)
      .expect(400);
  });

  it('/auth/register - email is mandatory', () => {
    return request(httpServer)
      .post('/auth/register')
      .send(missingEmail)
      .expect(400);
  });

  it('/auth/register - password is mandatory', () => {
    return request(httpServer)
      .post('/auth/register')
      .send(missingPassword)
      .expect(400);
  });

  it('/auth/register - Valid request successfully creates user', () => {
    return request(httpServer)
      .post('/auth/register')
      .send(completeUser)
      .expect('Content-Type', /json/)
      .expect(201)
      .then(({ body }) => {
        expect(body.data).toBeDefined();
        expect(body.data.name).toBe(completeUser.name);
        expect(body.data.email).toBe(completeUser.email);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  it('/register - password is not returned in response', () => {
    return request(httpServer)
      .post('/auth/register')
      .send(completeUser)
      .expect(201)
      .then(({ body }) => {
        expect(body.data.password).toBeUndefined();
      });
  });
});
