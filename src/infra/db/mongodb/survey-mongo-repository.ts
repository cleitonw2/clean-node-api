import { Collection, ObjectId } from 'mongodb'
import { SurveyModel } from '@/domain/models/survey'
import { AddSurvey } from '@/domain/usecases'
import { AddSurveyRepository, LoadSurveyByIdRepository, LoadSurveysRepository } from '@/data/protocols'
import { MongoHelper } from './mongo-helper'
import { QueryBuilder } from './query-builder'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository,
LoadSurveyByIdRepository {
  private async getCollection (): Promise<Collection> {
    return await MongoHelper.getCollection('surveys')
  }

  async add (data: AddSurvey.Params): Promise<void> {
    const surveyCollection = await this.getCollection()
    await surveyCollection.insertOne(data)
  }

  async loadAll (accountId: string): Promise<SurveyModel[]> {
    const surveyCollection = await this.getCollection()
    const query = new QueryBuilder()
      .lookup({
        from: 'surveyResults',
        foreignField: 'surveyId',
        localField: '_id',
        as: 'result'
      })
      .project({
        _id: 1,
        question: 1,
        answers: 1,
        date: 1,
        didAnswer: {
          $gte: [{
            $size: {
              $filter: {
                input: '$result',
                as: 'item',
                cond: {
                  $eq: ['$$item.accountId', new ObjectId(accountId)]
                }
              }
            }
          }, 1]
        }
      })
      .build()
    const surveys = await surveyCollection.aggregate(query).toArray()
    return MongoHelper.mapCollection(surveys)
  }

  async loadById (id: string): Promise<SurveyModel> {
    const surveyCollection = await this.getCollection()
    const result = await surveyCollection.findOne({ _id: new ObjectId(id) })
    return result && MongoHelper.map(result)
  }
}
