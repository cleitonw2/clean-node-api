import MockDate from 'mockdate'
import { noContent, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { LoadSurveysController } from '@/presentation/controllers/survey/load-surveys/load-surveys-controller'
import { LoadSurveysSpy } from '../mocks'
import { throwError } from '@/../tests/domain/mocks/test-helper'
import { HttpRequest } from '@/presentation/protocols'

const mockRequest = (): HttpRequest => ({ accountId: 'any_account_id' })

type SutTypes = {
  sut: LoadSurveysController
  loadSurveysSpy: LoadSurveysSpy
}

const makeSut = (): SutTypes => {
  const loadSurveysSpy = new LoadSurveysSpy()
  const sut = new LoadSurveysController(loadSurveysSpy)
  return {
    sut,
    loadSurveysSpy
  }
}

describe('LoadSurveys Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveys with correct value', async () => {
    const { sut, loadSurveysSpy } = makeSut()
    const htppRequest = mockRequest()
    sut.handle(htppRequest)
    expect(loadSurveysSpy.accountId).toBe(htppRequest.accountId)
  })

  test('Should return 200 on success', async () => {
    const { sut, loadSurveysSpy } = makeSut()
    const htppResponse = await sut.handle(mockRequest())
    expect(htppResponse).toEqual(ok(loadSurveysSpy.surveyModels))
  })

  test('Should return 204 if LoadSurveys returns empty', async () => {
    const { sut, loadSurveysSpy } = makeSut()
    loadSurveysSpy.surveyModels = []
    const htppResponse = await sut.handle(mockRequest())
    expect(htppResponse).toEqual(noContent())
  })

  test('Should return 500 if LoadSurveys throws', async () => {
    const { sut, loadSurveysSpy } = makeSut()
    jest.spyOn(loadSurveysSpy, 'load').mockRejectedValueOnce(throwError)
    const htppResponse = await sut.handle(mockRequest())
    expect(htppResponse).toEqual(serverError(new Error()))
  })
})
