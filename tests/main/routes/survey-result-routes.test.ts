import request from 'supertest'
import { Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'
import app from '@/main/config/app'
import env from '@/main/config/env'
import { MongoHelper } from '@/infra/db/mongodb/mongo-helper'

let surveyCollection: Collection
let accountCollection: Collection

const makeAccessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'any_name',
    email: 'valid_email@mail.com',
    password: 'any_password'
  })
  const accessToken = sign({ id: res.insertedId.toHexString() }, env.jwtSecret)
  await accountCollection.updateOne({
    _id: res.insertedId
  }, {
    $set: {
      accessToken
    }
  })
  return accessToken
}

const makeSurveyId = async (): Promise<string> => {
  const result = await surveyCollection.insertOne({
    question: 'new Question',
    answers: [
      {
        image: 'any_image',
        answer: 'answer_1'
      },
      {
        answer: 'answer_2'
      }
    ],
    date: new Date()
  })
  return result.insertedId.toHexString()
}

describe('Survey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(String(process.env.MONGO_URL))
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    accountCollection = await MongoHelper.getCollection('accounts')
    await surveyCollection.deleteMany({})
    await accountCollection.deleteMany({})
  })

  describe('PUT /surveys/:suveyId/results', () => {
    test('Should return 403 if save survey result without accessToken', async () => {
      const response = await request(app)
        .put('/api/surveys/any_id/results')
        .send({
          answer: 'any_answer'
        })
      expect(response.status).toEqual(403)
    })

    test('Should return 200 on save survey result succeeds', async () => {
      const accessToken = await makeAccessToken()
      const surveyId = await makeSurveyId()
      await request(app)
        .put(`/api/surveys/${surveyId}/results`)
        .set('x-access-token', accessToken)
        .send({
          answer: 'answer_1'
        }).expect(200)
    })
  })

  describe('GET /surveys/:suveyId/results', () => {
    test('Should return 403 if save survey result without accessToken', async () => {
      await request(app)
        .get('/api/surveys/any_id/results')
        .expect(403)
    })

    test('Should return 200 on load survey result succeeds', async () => {
      const accessToken = await makeAccessToken()
      const surveyId = await makeSurveyId()
      await request(app)
        .get(`/api/surveys/${surveyId}/results`)
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })
})
