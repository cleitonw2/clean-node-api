import { CheckSurveyById, LoadAnswersBySurvey, LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases'
import { mockSurveyResultModel } from '@/../tests/domain/mocks'

export class LoadAnswersBySurveySpy implements LoadAnswersBySurvey {
  id: string
  result = ['any_answer', 'other_answer']

  async loadAnswers (id: string): Promise<LoadAnswersBySurvey.Result> {
    this.id = id
    return this.result
  }
}

export class CheckSurveyByIdSpy implements CheckSurveyById {
  id: string
  result: boolean = true

  async checkById (id: string): Promise<CheckSurveyById.Result> {
    this.id = id
    return this.result
  }
}

export class SaveSurveyResultSpy implements SaveSurveyResult {
  saveSurveyResultParams: SaveSurveyResult.Params
  result = mockSurveyResultModel()

  async save (data: SaveSurveyResult.Params): Promise<SaveSurveyResult.Result> {
    this.saveSurveyResultParams = data
    return this.result
  }
}

export class LoadSurveyResultSpy implements LoadSurveyResult {
  result = mockSurveyResultModel()
  surveyId: string
  accountId: string

  async load (surveyId: string, accountId: string): Promise<LoadSurveyResult.Result> {
    this.accountId = accountId
    this.surveyId = surveyId
    return this.result
  }
}
