import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(String(process.env.MONGO_URL))
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.geCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    test('Should return an account on signup', async () => {
      const response = await request(app)
        .post('/api/signup')
        .send({
          name: 'any_name',
          email: 'any_email@mail.com',
          password: 'any_password',
          passwordConfirmation: 'any_password'
        })
      expect(response.status).toEqual(200)
      expect(response.body.id).toBeTruthy()
      expect(response.body.name).toEqual('any_name')
      expect(response.body.email).toEqual('any_email@mail.com')
    })
  })
})
