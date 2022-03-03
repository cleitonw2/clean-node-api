import { SurveyResultModel } from '@/domain/models'
import { CheckSurveyById, LoadAnswersBySurvey, LoadSurveyResult } from '@/domain/usecases'
import { SaveSurveyResult, SaveSurveyResultParams } from '@/domain/usecases/save-survey-result'
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
  saveSurveyResultParams: SaveSurveyResultParams
  surveyResultModel: SurveyResultModel = mockSurveyResultModel()

  async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    this.saveSurveyResultParams = data
    return this.surveyResultModel
  }
}

export class LoadSurveyResultSpy implements LoadSurveyResult {
  result = mockSurveyResultModel()
  surveyId: string
  accountId: string

  async load (surveyId: string, accountId: string): Promise<SurveyResultModel> {
    this.accountId = accountId
    this.surveyId = surveyId
    return this.result
  }
}
