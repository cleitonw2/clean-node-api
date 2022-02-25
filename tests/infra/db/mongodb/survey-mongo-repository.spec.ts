import { Collection, ObjectId } from 'mongodb'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/survey-mongo-repository'
import { mockAddSurveyParams, mockSurveyModels } from '@/../tests/domain/mocks'

let surveyCollection: Collection

const makeSut = (): SurveyMongoRepository => new SurveyMongoRepository()

describe('Survey Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(String(process.env.MONGO_URL))
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
  })

  describe('add()', () => {
    test('Should add a survey on success', async () => {
      const sut = makeSut()
      const addSurveyParams = mockAddSurveyParams()
      await sut.add(addSurveyParams)
      const survey = await surveyCollection.findOne({ question: addSurveyParams.question })
      expect(survey).toBeTruthy()
      expect(survey?._id).toBeTruthy()
    })
  })

  describe('loadAll()', () => {
    test('Should load all surveys on success', async () => {
      const sut = makeSut()
      const surveyModels = mockSurveyModels()
      await surveyCollection.insertMany(surveyModels)
      const surveys = await sut.loadAll()
      expect(surveys).toBeInstanceOf(Array)
      expect(surveys[0].id).toBeTruthy()
      expect(surveys[0].question).toBe(surveyModels[0].question)
    })

    test('Should load empty list', async () => {
      const sut = makeSut()
      const surveys = await sut.loadAll()
      expect(surveys).toBeInstanceOf(Array)
      expect(surveys).toHaveLength(0)
    })
  })

  describe('loadById()', () => {
    test('Should load survey by id on success', async () => {
      const sut = makeSut()
      const addSurveyParams = mockAddSurveyParams()
      const res = await surveyCollection.insertOne(addSurveyParams)
      const survey = await sut.loadById(res.insertedId.toHexString())
      expect(survey).toBeTruthy()
      expect(survey.id).toBeTruthy()
    })

    test('Should return null if load survey by id fails', async () => {
      const sut = makeSut()
      const id = new ObjectId()
      const survey = await sut.loadById(id.toHexString())
      expect(survey).toBeNull()
    })
  })
})
