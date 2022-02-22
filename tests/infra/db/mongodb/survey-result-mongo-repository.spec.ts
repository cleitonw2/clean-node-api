import { Collection } from 'mongodb'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { SurveyResultMongoRepository } from '@/infra/db/mongodb/survey-result/survey-result-mongo-repository'
import { mockSaveSurveyResultParams } from '@/../tests/domain/mocks'

let surveyResultCollection: Collection

const makeSut = (): SurveyResultMongoRepository => new SurveyResultMongoRepository()

describe('SurveyResultMongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(String(process.env.MONGO_URL))
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyResultCollection = await MongoHelper.geCollection('surveyResults')
    await surveyResultCollection.deleteMany({})
  })

  describe('save()', () => {
    test('Should create a survey result if its new', async () => {
      const sut = makeSut()
      const saveSurveyResultParams = mockSaveSurveyResultParams()
      const surveyResult = await sut.save(saveSurveyResultParams)
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.id).toBeTruthy()
    })

    test('Should update a survey result if already exists', async () => {
      const sut = makeSut()
      const saveSurveyResultParams = mockSaveSurveyResultParams()
      await surveyResultCollection.insertOne(saveSurveyResultParams)
      saveSurveyResultParams.answer = 'updated_answer'
      const surveyResult = await sut.save(saveSurveyResultParams)
      expect(surveyResult.id).toBeTruthy()
      expect(surveyResult.answer).toBe(saveSurveyResultParams.answer)
    })
  })
})
