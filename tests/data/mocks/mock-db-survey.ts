import { AddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository'
import { SurveyModel } from '@/domain/models'
import { AddSurvey } from '@/domain/usecases'
import { mockSurveyModel, mockSurveyModels } from '../../domain/mocks'
import { LoadSurveyByIdRepository } from '../protocols/db/survey/load-survey-by-id-repository'
import { LoadSurveysRepository } from '../protocols/db/survey/load-surveys-repository'

export class AddSurveyRepositorySpy implements AddSurveyRepository {
  addSurveyParams: AddSurvey.Params

  async add (add: AddSurvey.Params): Promise<void> {
    this.addSurveyParams = add
  }
}

export class LoadSurveyByIdRepositorySpy implements LoadSurveyByIdRepository {
  suveyModel: SurveyModel = mockSurveyModel()
  id: string

  async loadById (id: string): Promise<SurveyModel> {
    this.id = id
    return this.suveyModel
  }
}

export class LoadSurveysRepositorySpy implements LoadSurveysRepository {
  sureveyModels = mockSurveyModels()
  accountId: string

  async loadAll (accountId: string): Promise<SurveyModel[]> {
    this.accountId = accountId
    return this.sureveyModels
  }
}
