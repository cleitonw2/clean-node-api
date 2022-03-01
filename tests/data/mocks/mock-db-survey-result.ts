import { mockSurveyResultModel } from '@/../tests/domain/mocks'
import { SaveSurveyResultRepository } from '@/data/protocols/db/survey-result/save-survey-result-repository'
import { SaveSurveyResultParams, SurveyResultModel } from '@/data/usecases/survey-result/save-survey-result/db-save-survey-result-protocols'
import { LoadSurveyResultRepository } from '@/data/protocols/db/survey-result/load-survey-result-repository'

export class SaveSurveyResultRepositorySpy implements SaveSurveyResultRepository {
  saveSurveyResultParams: SaveSurveyResultParams

  async save (data: SaveSurveyResultParams): Promise<void> {
    this.saveSurveyResultParams = data
  }
}

export class LoadSurveyResultRepositorySpy implements LoadSurveyResultRepository {
  surveyResultModel = mockSurveyResultModel()
  surveyId: string
  accountId: string

  async loadBySurveyId (surveyId: string, accountId: string): Promise<SurveyResultModel> {
    this.accountId = accountId
    this.surveyId = surveyId
    return this.surveyResultModel
  }
}
