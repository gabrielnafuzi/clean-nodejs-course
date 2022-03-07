import { hash } from 'bcrypt'
import type { Collection } from 'mongodb'
import request from 'supertest'

import { MongoHelper } from '../../../infra/db/mongodb/helpers/mongo-helper'
import { app } from '../../config/app'

let accountCollection: Collection

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')

    await accountCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    it('should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'John Doe',
          email: 'john_doe@email.com',
          password: '123',
          passwordConfirmation: '123',
        })
        .expect(201)
    })
  })

  describe('POST /login', () => {
    it('should return 200 on login', async () => {
      const password = await hash('123', 12)

      await accountCollection.insertOne({
        name: 'John Doe',
        email: 'john_doe@email.com',
        password,
      })

      await request(app)
        .post('/api/login')
        .send({
          email: 'john_doe@email.com',
          password: '123',
        })
        .expect(200)
    })

    it('should return 401 on login', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'john_doe@email.com',
          password: '123',
        })
        .expect(401)
    })
  })
})
