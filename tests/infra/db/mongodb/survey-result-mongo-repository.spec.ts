import { Collection, ObjectId } from 'mongodb'
import { SurveyModel } from '@/domain/models/survey'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { SurveyResultMongoRepository } from '@/infra/db/mongodb/survey-result/survey-result-mongo-repository'
import { mockAddAccountParams, mockAddSurveyParams } from '@/../tests/domain/mocks'

let surveyResultCollection: Collection
let surveyCollection: Collection
let accountCollection: Collection

const mockSurvey = async (): Promise<SurveyModel> => {
  const res = await surveyCollection.insertOne(mockAddSurveyParams())
  const survey = await surveyCollection.findOne({ _id: res.insertedId })
  return survey && MongoHelper.map(survey)
}

const mockAccountId = async (): Promise<string> => {
  const res = await accountCollection.insertOne(mockAddAccountParams())
  return res.insertedId.toHexString()
}

const makeSut = (): SurveyResultMongoRepository => new SurveyResultMongoRepository()

describe('SurveyResultMongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(String(process.env.MONGO_URL))
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.geCollection('surveys')
    await surveyCollection.deleteMany({})
    surveyResultCollection = await MongoHelper.geCollection('surveyResults')
    await surveyResultCollection.deleteMany({})
    accountCollection = await MongoHelper.geCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('save()', () => {
    test('Should create a survey result if its new', async () => {
      const sut = makeSut()
      const survey = await mockSurvey()
      const accountId = await mockAccountId()
      const surveyResult = await sut.save({
        surveyId: survey.id,
        accountId,
        answer: survey.answers[0].answer,
        date: new Date()
      })
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.surveyId).toEqual(new ObjectId(survey.id))
      expect(surveyResult.answers[0].answer).toBe(survey.answers[0].answer)
      expect(surveyResult.answers[0].count).toBe(1)
      expect(surveyResult.answers[0].percent).toBe(100)
    })

    test('Should update a survey result if already exists', async () => {
      const sut = makeSut()
      const survey = await mockSurvey()
      const accountId = await mockAccountId()
      await surveyResultCollection.insertOne({
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(accountId),
        answer: survey.answers[0].answer,
        date: new Date()
      })
      const surveyResult = await sut.save({
        surveyId: survey.id,
        accountId: accountId,
        answer: survey.answers[1].answer,
        date: new Date()
      })
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.surveyId).toEqual(new ObjectId(survey.id))
      expect(surveyResult.answers[0].answer).toBe(survey.answers[1].answer)
      expect(surveyResult.answers[0].count).toBe(1)
      expect(surveyResult.answers[0].percent).toBe(100)
    })
  })
})
