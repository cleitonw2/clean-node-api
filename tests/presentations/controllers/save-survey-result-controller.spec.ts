import MockDate from 'mockdate'
import { forbidden, ok, serverError } from '@/presentation/helpers'
import { InvalidParamError } from '@/presentation/errors'
import { HttpRequest } from '@/presentation/protocols'
import { SaveSurveyResultController } from '@/presentation/controllers'
import { LoadSurveyByIdSpy, SaveSurveyResultSpy } from '../mocks'
import { throwError } from '@/../tests/domain/mocks/test-helper'

const mockRequest = (): HttpRequest => ({
  params: {
    surveyId: 'any_survey_id'
  },
  body: {
    answer: 'any_answer'
  },
  accountId: 'any_account_id'
})

type SutTypes = {
  sut: SaveSurveyResultController
  loadSurveyByIdSpy: LoadSurveyByIdSpy
  saveSurveyResultSpy: SaveSurveyResultSpy
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdSpy = new LoadSurveyByIdSpy()
  const saveSurveyResultSpy = new SaveSurveyResultSpy()
  const sut = new SaveSurveyResultController(loadSurveyByIdSpy, saveSurveyResultSpy)
  return {
    sut,
    loadSurveyByIdSpy,
    saveSurveyResultSpy
  }
}

describe('SaveSurveyResult Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveyById with correct values', async () => {
    const { sut, loadSurveyByIdSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(loadSurveyByIdSpy.id).toBe(httpRequest.params.surveyId)
  })

  test('Should return 403 if LoadSurveyById returns null', async () => {
    const { sut, loadSurveyByIdSpy } = makeSut()
    loadSurveyByIdSpy.surveyModel = null as any
    const htppResponse = await sut.handle(mockRequest())
    expect(htppResponse).toEqual(forbidden(new InvalidParamError('surveyId')))
  })

  test('Should return 500 if LoadSurveyById throws', async () => {
    const { sut, loadSurveyByIdSpy } = makeSut()
    jest.spyOn(loadSurveyByIdSpy, 'loadById').mockRejectedValueOnce(throwError)
    const htppResponse = await sut.handle({})
    expect(htppResponse).toEqual(serverError(new Error()))
  })

  test('Should return 403 if invalid answer is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = mockRequest()
    httpRequest.body.answer = 'invalid_answer'
    const htppResponse = await sut.handle(httpRequest)
    expect(htppResponse).toEqual(forbidden(new InvalidParamError('answer')))
  })

  test('Should call SaveSurveyResult with correct values', async () => {
    const { sut, saveSurveyResultSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(saveSurveyResultSpy.saveSurveyResultParams).toEqual({
      surveyId: httpRequest.params.surveyId,
      accountId: httpRequest.accountId,
      answer: httpRequest.body.answer,
      date: new Date()
    })
  })

  test('Should return 500 if SaveSurveyResult throws', async () => {
    const { sut, saveSurveyResultSpy } = makeSut()
    jest.spyOn(saveSurveyResultSpy, 'save').mockRejectedValueOnce(throwError)
    const htppResponse = await sut.handle(mockRequest())
    expect(htppResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut, saveSurveyResultSpy } = makeSut()
    const htppResponse = await sut.handle(mockRequest())
    expect(htppResponse).toEqual(ok(saveSurveyResultSpy.surveyResultModel))
  })
})
