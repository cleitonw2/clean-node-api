import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { SurveyResultMongoRepository } from './survey-result-mongo-repository'
import { SaveSurveyResultModel } from '@/domain/usecases/save-survey-result'
import { AccountModel } from '@/domain/models/account'
import { SurveyModel } from '@/domain/models/survey'

let surveyCollection: Collection
let accountCollection: Collection
let surveyResultCollection: Collection

const makeFakeSurveyResultData = async (): Promise<SaveSurveyResultModel> => {
  const account = await makeFakeAccount()
  const survey = await makeFakeSurvey()
  return {
    surveyId: survey.id,
    accountId: account.id,
    answer: survey.answers[0].answer,
    date: new Date()
  }
}

const makeFakeAccount = async (): Promise<AccountModel> => {
  const data = {
    name: 'any_name',
    email: 'any_email',
    password: 'any_password'
  }
  const res = await accountCollection.insertOne(data)
  return {
    id: res.insertedId.toHexString(),
    ...data
  }
}

const makeFakeSurvey = async (): Promise<SurveyModel> => {
  const data = {
    question: 'valid_question',
    answers: [
      {
        image: 'any_image',
        answer: 'any_answer'
      },
      {
        answer: 'other_answer'
      }
    ],
    date: new Date()
  }
  const res = await surveyCollection.insertOne(data)
  return {
    id: res.insertedId.toHexString(),
    ...data
  }
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
    accountCollection = await MongoHelper.geCollection('accounts')
    surveyResultCollection = await MongoHelper.geCollection('surveyResults')
    await surveyCollection.deleteMany({})
    await accountCollection.deleteMany({})
    await surveyResultCollection.deleteMany({})
  })

  describe('save()', () => {
    test('Should create a survey result if its new', async () => {
      const sut = makeSut()
      const surveyResult = await sut.save(await makeFakeSurveyResultData())
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.id).toBeTruthy()
    })
  })
})
