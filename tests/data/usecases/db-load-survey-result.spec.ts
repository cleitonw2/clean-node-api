import { DbLoadSurveyResult } from '@/data/usecases'
import { throwError, mockEmptySurveyResultModel } from '@/../tests/domain/mocks'
import { LoadSurveyByIdRepositorySpy, LoadSurveyResultRepositorySpy } from '../mocks'

type SutTypes = {
  sut: DbLoadSurveyResult
  loadSurveyResultRepositorySpy: LoadSurveyResultRepositorySpy
  loadSurveyByIdRepositorySpy: LoadSurveyByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadSurveyResultRepositorySpy = new LoadSurveyResultRepositorySpy()
  const loadSurveyByIdRepositorySpy = new LoadSurveyByIdRepositorySpy()
  const sut = new DbLoadSurveyResult(loadSurveyResultRepositorySpy, loadSurveyByIdRepositorySpy)
  return {
    sut,
    loadSurveyResultRepositorySpy,
    loadSurveyByIdRepositorySpy
  }
}

describe('DbLoadSurveyResult UseCase', () => {
  test('Should call LoadSurveyResultRepository with correct surveyId', async () => {
    const { sut, loadSurveyResultRepositorySpy } = makeSut()
    await sut.load('any_survey_id', 'any_account_id')
    expect(loadSurveyResultRepositorySpy.surveyId).toBe('any_survey_id')
    expect(loadSurveyResultRepositorySpy.accountId).toBe('any_account_id')
  })

  test('Should throw if LoadSurveyResultRepository throws', async () => {
    const { sut, loadSurveyResultRepositorySpy } = makeSut()
    jest.spyOn(loadSurveyResultRepositorySpy, 'loadBySurveyId').mockRejectedValueOnce(throwError)
    const promise = sut.load('any_survey_id', 'any_account_id')
    expect(promise).rejects.toThrow()
  })

  test('Should call LoadSurveyByIdRepository with correct surveyId', async () => {
    const { sut, loadSurveyResultRepositorySpy, loadSurveyByIdRepositorySpy } = makeSut()
    loadSurveyResultRepositorySpy.result = null as any
    await sut.load('any_survey_id', 'any_account_id')
    expect(loadSurveyByIdRepositorySpy.id).toBe('any_survey_id')
  })

  test('Should return SurveyResultModel if LoadSurveyByIdRepository returns null', async () => {
    const { sut, loadSurveyResultRepositorySpy, loadSurveyByIdRepositorySpy } = makeSut()
    loadSurveyResultRepositorySpy.result = null as any
    const surveyResult = await sut.load('any_survey_id', 'any_account_id')
    expect(surveyResult).toEqual(mockEmptySurveyResultModel(loadSurveyByIdRepositorySpy.result))
  })

  test('Should return SurveyResultModel on success', async () => {
    const { sut, loadSurveyResultRepositorySpy } = makeSut()
    const surveyResult = await sut.load('any_survey_id', 'any_account_id')
    expect(surveyResult).toEqual(loadSurveyResultRepositorySpy.result)
  })
})
