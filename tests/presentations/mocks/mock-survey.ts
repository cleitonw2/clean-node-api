import { SurveyModel } from '@/domain/models/survey'
import { AddSurvey, AddSurveyParams } from '@/domain/usecases/survey/add-survey'
import { LoadSurveys } from '@/domain/usecases/survey/load-surveys'
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

  async load (): Promise<SurveyModel[]> {
    return this.surveyModels
  }
}
