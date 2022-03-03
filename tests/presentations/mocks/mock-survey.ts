import { AddSurvey } from '@/domain/usecases/add-survey'
import { LoadSurveys } from '@/domain/usecases/load-surveys'
import { mockSurveyModels } from '@/../tests/domain/mocks'

export class AddSurveySpy implements AddSurvey {
  addSurveyParams: AddSurvey.Params

  async add (data: AddSurvey.Params): Promise<void> {
    this.addSurveyParams = data
  }
}

export class LoadSurveysSpy implements LoadSurveys {
  result = mockSurveyModels()
  accountId: string

  async load (accountId: string): Promise<LoadSurveys.Result> {
    this.accountId = accountId
    return this.result
  }
}
