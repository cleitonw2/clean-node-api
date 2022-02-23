import MockDate from 'mockdate'
import { DbAddSurvey } from '@/data/usecases/survey/add-survey/db-add-survey'
import { AddSurveyRepositorySpy } from '../mocks'
import { mockAddSurveyParams } from '@/../tests/domain/mocks'
import { throwError } from '../../domain/mocks/test-helper'

type SutTypes = {
  addSurveyRepositorySpy: AddSurveyRepositorySpy
  sut: DbAddSurvey
}

const makeSut = (): SutTypes => {
  const addSurveyRepositorySpy = new AddSurveyRepositorySpy()
  const sut = new DbAddSurvey(addSurveyRepositorySpy)
  return {
    sut,
    addSurveyRepositorySpy
  }
}

describe('DbAddSurvey Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositorySpy } = makeSut()
    const surveyData = mockAddSurveyParams()
    await sut.add(surveyData)
    expect(addSurveyRepositorySpy.addSurveyParams).toEqual(surveyData)
  })

  test('Should throw if AddSurveyRepository throws', async () => {
    const { sut, addSurveyRepositorySpy } = makeSut()
    jest.spyOn(addSurveyRepositorySpy, 'add').mockRejectedValueOnce(throwError)
    const promise = sut.add(mockAddSurveyParams())
    await expect(promise).rejects.toThrow()
  })
})
