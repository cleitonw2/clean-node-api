import request from 'supertest'
import bcrypt from 'bcrypt'
import app from '../config/app'
import { Collection } from 'mongodb'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'

let accountCollection: Collection

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(String(process.env.MONGO_URL))
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.geCollection('accounts')
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

  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      const password = await bcrypt.hash('any_password', 12)
      await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password
      })
      const response = await request(app)
        .post('/api/login')
        .send({
          email: 'any_email@mail.com',
          password: 'any_password'
        })
      expect(response.status).toEqual(200)
    })

    test('Should return 401 on login', async () => {
      const response = await request(app)
        .post('/api/login')
        .send({
          email: 'any_email@mail.com',
          password: 'any_password'
        })
      expect(response.status).toEqual(401)
    })
  })
})
