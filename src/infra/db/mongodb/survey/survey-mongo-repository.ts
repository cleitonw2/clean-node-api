import { LoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository'
import { AddSurveyModel, AddSurveyRepository } from '@/data/usecases/survey/add-survey/db-add-survey-protocols'
import { LoadSurveyByIdRepository } from '@/data/usecases/survey/load-survey-by-id/db-load-survey-by-id-protocols'
import { SurveyModel } from '@/domain/models/survey'
import { ObjectId } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository, LoadSurveyByIdRepository {
  async add (data: AddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.geCollection('surveys')
    await surveyCollection.insertOne(data)
  }

  async loadAll (): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.geCollection('surveys')
    const result = await surveyCollection.find().toArray()
    return result && MongoHelper.mapCollection(result)
  }

  async loadById (id: string): Promise<SurveyModel> {
    const surveyCollection = await MongoHelper.geCollection('surveys')
    const result = await surveyCollection.findOne({ _id: new ObjectId(id) })
    return result && MongoHelper.map(result)
  }
}
