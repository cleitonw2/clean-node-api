import { SurveyModel } from '@/domain/models/survey'
import { SurveyResultModel } from '@/domain/models/survey-result'
import { SaveSurveyResult, SaveSurveyResultParams } from '@/domain/usecases/save-survey-result'
import { LoadSurveyById } from '@/domain/usecases/load-survey-by-id'
import { mockSurveyModel, mockSurveyResultModel } from '@/../tests/domain/mocks'
import { LoadSurveyResult } from '@/domain/usecases/load-survey-result'

export class LoadSurveyByIdSpy implements LoadSurveyById {
  id: string
  surveyModel: SurveyModel = mockSurveyModel()

  async loadById (id: string): Promise<SurveyModel> {
    this.id = id
    return this.surveyModel
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
  surveyResultModel = mockSurveyResultModel()
  surveyId: string

  async load (surveyId: string): Promise<SurveyResultModel> {
    this.surveyId = surveyId
    return this.surveyResultModel
  }
}
