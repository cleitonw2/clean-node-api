import request from 'supertest'
import app from '../config/app'
import env from '../config/env'
import { Collection } from 'mongodb'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { sign } from 'jsonwebtoken'

let surveyCollection: Collection
let accountCollection: Collection

const makeFakeRequest = (): any => ({
  question: 'new Question',
  answers: [
    {
      image: 'any_image',
      answer: 'any_answer'
    },
    {
      answer: 'other_answer'
    }
  ]
})

describe('Survey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(String(process.env.MONGO_URL))
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.geCollection('surveys')
    accountCollection = await MongoHelper.geCollection('accounts')
    await surveyCollection.deleteMany({})
    await accountCollection.deleteMany({})
  })

  describe('POST /surveys', () => {
    test('Should return 403 if add survey without accessToken', async () => {
      const response = await request(app)
        .post('/api/surveys')
        .send(makeFakeRequest())
      expect(response.status).toEqual(403)
    })

    test('Should return 204 on add survey with valid accessToken', async () => {
      const accessToken = sign({ id: 'any_id' }, env.jwtSecret)
      await accountCollection.insertOne({
        name: 'any_name',
        email: 'valid_email@mail.com',
        password: 'any_password',
        role: 'admin',
        accessToken
      })
      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send(makeFakeRequest()).expect(204)
    })
  })

  describe('GET /surveys', () => {
    test('Should return 403 if load surveys without accessToken', async () => {
      const response = await request(app)
        .get('/api/surveys')
        .send(makeFakeRequest())
      expect(response.status).toEqual(403)
    })
  })
})
