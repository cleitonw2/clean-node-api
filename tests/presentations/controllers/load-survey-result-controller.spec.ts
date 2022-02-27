import { forbidden } from '@/presentation/helpers/http/http-helper'
import { InvalidParamError } from '@/presentation/errors'
import { HttpRequest } from '@/presentation/controllers/survey-result/save-survey-result-controllers-protocols'
import { LoadSurveyResultController } from '@/presentation/controllers/survey-result/load-survey-result/load-survey-result-controller'
import { LoadSurveyByIdSpy } from '../mocks'

const mockRequest = (): HttpRequest => ({
  params: {
    surveyId: 'any_survey_id'
  }
})

type SutTypes = {
  sut: LoadSurveyResultController
  loadSurveyByIdSpy: LoadSurveyByIdSpy
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdSpy = new LoadSurveyByIdSpy()
  const sut = new LoadSurveyResultController(loadSurveyByIdSpy)
  return {
    sut,
    loadSurveyByIdSpy
  }
}

describe('LoadSurveyResult Controller', () => {
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
})
