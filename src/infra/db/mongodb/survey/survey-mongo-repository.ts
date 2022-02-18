import { LoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository'
import { AddSurveyModel, AddSurveyRepository } from '@/data/usecases/add-survey/db-add-survey-protocols'
import { SurveyModel } from '@/domain/models/survey'
import { MongoHelper } from '../helpers/mongo-helper'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository {
  async add (data: AddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.geCollection('surveys')
    await surveyCollection.insertOne(data)
  }

  async loadAll (): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.geCollection('surveys')
    const result = await surveyCollection.find().toArray()
    return result && MongoHelper.mapCollection(result)
  }
}
