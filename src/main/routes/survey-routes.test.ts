import request from 'supertest'
import app from '../config/app'
import { Collection } from 'mongodb'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'

let surveyCollection: Collection

describe('Survey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(String(process.env.MONGO_URL))
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.geCollection('surveys')
    await surveyCollection.deleteMany({})
  })

  describe('POST /surveys', () => {
    test('Should return 403 if add survey without accessToken', async () => {
      const response = await request(app)
        .post('/api/surveys')
        .send({
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
      expect(response.status).toEqual(403)
    })
  })
})
