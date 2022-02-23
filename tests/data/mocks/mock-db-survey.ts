import { AddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository'
import { AddSurveyParams } from '@/data/usecases/survey/add-survey/db-add-survey-protocols'
import { mockSurveyModel, mockSurveyModels } from '../../domain/mocks'
import { LoadSurveyByIdRepository } from '../protocols/db/survey/load-survey-by-id-repository'
import { LoadSurveysRepository } from '../protocols/db/survey/load-surveys-repository'
import { SurveyModel } from '../usecases/survey/load-survey-by-id/db-load-survey-by-id-protocols'

export class AddSurveyRepositorySpy implements AddSurveyRepository {
  addSurveyParams: AddSurveyParams

  async add (add: AddSurveyParams): Promise<void> {
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

  async loadAll (): Promise<SurveyModel[]> {
    return this.sureveyModels
  }
}
