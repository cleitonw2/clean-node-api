import { Collection, ObjectId } from 'mongodb'
import { MongoHelper } from '@/infra/db/mongodb/mongo-helper'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey-mongo-repository'
import { mockAddAccountParams, mockAddSurveyParams, mockSurveyModels } from '@/../tests/domain/mocks'

let surveyCollection: Collection
let accountCollection: Collection
let surveyResultCollection: Collection

const mockAccountId = async (): Promise<string> => {
  const res = await accountCollection.insertOne(mockAddAccountParams())
  return res.insertedId.toHexString()
}

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
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
    surveyResultCollection = await MongoHelper.getCollection('surveyResults')
    await surveyResultCollection.deleteMany({})
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
      const accountId = await mockAccountId()
      const surveyModels = mockSurveyModels()
      const res = await surveyCollection.insertMany(surveyModels)
      const surveyId = res.insertedIds[0]
      await surveyResultCollection.insertOne({
        surveyId,
        accountId: new ObjectId(accountId),
        answer: surveyModels[0].answers[0].answer,
        date: new Date()
      })
      const surveys = await sut.loadAll(accountId)
      expect(surveys[0].id).toBeTruthy()
      expect(surveys[0].question).toBe(surveyModels[0].question)
      expect(surveys[0].didAnswer).toBe(true)
      expect(surveys[1].id).toBeTruthy()
      expect(surveys[1].didAnswer).toBe(false)
    })

    test('Should load empty list', async () => {
      const sut = makeSut()
      const surveys = await sut.loadAll(await mockAccountId())
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
