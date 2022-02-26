import { DbLoadSurveyResult } from '@/data/usecases/survey-result/load-survey-result/db-load-survey-result'
import { throwError } from '../../domain/mocks/test-helper'
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

  test('Should throw if LoadSurveyResultRepository throws', async () => {
    const { sut, loadSurveyResultRepositorySpy } = makeSut()
    jest.spyOn(loadSurveyResultRepositorySpy, 'loadBySurveyId').mockRejectedValueOnce(throwError)
    const promise = sut.load('any_survey_id')
    expect(promise).rejects.toThrow()
  })

  test('Should return SurveyResultModel on success', async () => {
    const { sut, loadSurveyResultRepositorySpy } = makeSut()
    const surveyResult = await sut.load('any_survey_id')
    expect(surveyResult).toEqual(loadSurveyResultRepositorySpy.surveyResultModel)
  })
})
