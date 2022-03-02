import { forbidden, ok, serverError } from '@/presentation/helpers'
import { InvalidParamError } from '@/presentation/errors'
import { LoadSurveyResultController } from '@/presentation/controllers'
import { CheckSurveyByIdSpy, LoadSurveyResultSpy } from '../mocks'
import { throwError } from '@/../tests/domain/mocks'

const mockRequest = (): LoadSurveyResultController.Request => ({
  surveyId: 'any_survey_id',
  accountId: 'any_account_id'
})

type SutTypes = {
  sut: LoadSurveyResultController
  checkSurveyByIdSpy: CheckSurveyByIdSpy
  loadSurveyResultSpy: LoadSurveyResultSpy
}

const makeSut = (): SutTypes => {
  const checkSurveyByIdSpy = new CheckSurveyByIdSpy()
  const loadSurveyResultSpy = new LoadSurveyResultSpy()
  const sut = new LoadSurveyResultController(checkSurveyByIdSpy, loadSurveyResultSpy)
  return {
    sut,
    checkSurveyByIdSpy,
    loadSurveyResultSpy
  }
}

describe('LoadSurveyResult Controller', () => {
  test('Should call CheckSurveyById with correct value', async () => {
    const { sut, checkSurveyByIdSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(checkSurveyByIdSpy.id).toBe(request.surveyId)
  })

  test('Should return 403 if CheckSurveyById returns false', async () => {
    const { sut, checkSurveyByIdSpy } = makeSut()
    checkSurveyByIdSpy.result = false
    const htppResponse = await sut.handle(mockRequest())
    expect(htppResponse).toEqual(forbidden(new InvalidParamError('surveyId')))
  })

  test('Should return 500 if CheckSurveyById throws', async () => {
    const { sut, checkSurveyByIdSpy } = makeSut()
    jest.spyOn(checkSurveyByIdSpy, 'checkById').mockRejectedValueOnce(throwError)
    const htppResponse = await sut.handle(mockRequest())
    expect(htppResponse).toEqual(serverError(new Error()))
  })

  test('Should call LoadSurveyResult with correct values', async () => {
    const { sut, loadSurveyResultSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadSurveyResultSpy.surveyId).toBe(request.surveyId)
    expect(loadSurveyResultSpy.accountId).toBe(request.accountId)
  })

  test('Should return 500 if LoadSurveyResult throws', async () => {
    const { sut, loadSurveyResultSpy } = makeSut()
    jest.spyOn(loadSurveyResultSpy, 'load').mockRejectedValueOnce(throwError)
    const htppResponse = await sut.handle(mockRequest())
    expect(htppResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut, loadSurveyResultSpy } = makeSut()
    const htppResponse = await sut.handle(mockRequest())
    expect(htppResponse).toEqual(ok(loadSurveyResultSpy.result))
  })
})
