import { DbLoadSurveyResult } from '@/data/usecases/survey-result/load-survey-result/db-load-survey-result'
import { LoadSurveyResultRepositorySpy } from '../mocks'

type SutTypes = {
  sut: DbLoadSurveyResult
  loadSurveyResultRepositorySpy: LoadSurveyResultRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadSurveyResultRepositorySpy = new LoadSurveyResultRepositorySpy()
  const sut = new DbLoadSurveyResult(loadSurveyResultRepositorySpy)
  return {
    sut,
    loadSurveyResultRepositorySpy
  }
}

describe('DbLoadSurveyResult UseCase', () => {
  test('Should call LoadSurveyResultRepository with correct surveyId', async () => {
    const { sut, loadSurveyResultRepositorySpy } = makeSut()
    await sut.load('any_survey_id')
    expect(loadSurveyResultRepositorySpy.surveyId).toBe('any_survey_id')
  })
})
