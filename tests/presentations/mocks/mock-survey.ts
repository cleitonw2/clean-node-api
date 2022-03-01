import { SurveyModel } from '@/domain/models/survey'
import { AddSurvey, AddSurveyParams } from '@/domain/usecases/add-survey'
import { LoadSurveys } from '@/domain/usecases/load-surveys'
import { mockSurveyModels } from '@/../tests/domain/mocks'

export class AddSurveySpy implements AddSurvey {
  addSurveyParams: AddSurveyParams

  async add (data: AddSurveyParams): Promise<void> {
    this.addSurveyParams = data
    return new Promise(resolve => resolve())
  }
}

export class LoadSurveysSpy implements LoadSurveys {
  surveyModels: SurveyModel[] = mockSurveyModels()
  accountId: string

  async load (accountId: string): Promise<SurveyModel[]> {
    this.accountId = accountId
    return this.surveyModels
  }
}
