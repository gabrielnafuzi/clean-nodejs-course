import request from 'supertest'

import { MongoHelper } from '../../../infra/db/mongodb/helpers/mongo-helper'
import { app } from '../../config/app'

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('accounts')

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
})
