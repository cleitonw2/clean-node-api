import { AddSurvey, AddSurveyParams } from '@/domain/usecases/survey/add-survey'

export class AddSurveySpy implements AddSurvey {
  addSurveyParams: AddSurveyParams

  async add (data: AddSurveyParams): Promise<void> {
    this.addSurveyParams = data
    return new Promise(resolve => resolve())
  }
}
