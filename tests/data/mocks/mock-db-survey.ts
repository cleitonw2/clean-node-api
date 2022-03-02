import { SurveyModel } from '@/domain/models'
import { AddSurvey } from '@/domain/usecases'
import {
  LoadSurveysRepository,
  LoadSurveyByIdRepository,
  CheckSurveyByIdRepository,
  AddSurveyRepository
} from '@/data/protocols/db'
import { mockSurveyModel, mockSurveyModels } from '@/../tests/domain/mocks'

export class AddSurveyRepositorySpy implements AddSurveyRepository {
  addSurveyParams: AddSurvey.Params

  async add (add: AddSurvey.Params): Promise<void> {
    this.addSurveyParams = add
  }
}

export class LoadSurveyByIdRepositorySpy implements LoadSurveyByIdRepository {
  result: SurveyModel = mockSurveyModel()
  id: string

  async loadById (id: string): Promise<LoadSurveyByIdRepository.Result> {
    this.id = id
    return this.result
  }
}

export class CheckSurveyByIdRepositorySpy implements CheckSurveyByIdRepository {
  result: boolean = true
  id: string

  async checkById (id: string): Promise<CheckSurveyByIdRepository.Result> {
    this.id = id
    return this.result
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
