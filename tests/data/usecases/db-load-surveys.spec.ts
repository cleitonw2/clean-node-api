import MockDate from 'mockdate'
import { DbLoadSurveys } from '@/data/usecases/survey/load-surveys/db-load-surveys'
import { LoadSurveysRepositorySpy } from '../mocks'
import { throwError } from '@/../tests/domain/mocks/test-helper'

type SutTypes = {
  sut: DbLoadSurveys
  loadSurveysRepsoitorySpy: LoadSurveysRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadSurveysRepsoitorySpy = new LoadSurveysRepositorySpy()
  const sut = new DbLoadSurveys(loadSurveysRepsoitorySpy)
  return {
    sut,
    loadSurveysRepsoitorySpy
  }
}

describe('DbLoadSurveys', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveysRepository', async () => {
    const { sut, loadSurveysRepsoitorySpy } = makeSut()
    const loadAllSpy = jest.spyOn(loadSurveysRepsoitorySpy, 'loadAll')
    await sut.load()
    expect(loadAllSpy).toBeCalled()
  })

  test('Should return a list of surveys on success', async () => {
    const { sut, loadSurveysRepsoitorySpy } = makeSut()
    const surveys = await sut.load()
    expect(surveys).toEqual(loadSurveysRepsoitorySpy.sureveyModels)
  })

  test('Should throw if LoadSurveysRepository throws', async () => {
    const { sut, loadSurveysRepsoitorySpy } = makeSut()
    jest.spyOn(loadSurveysRepsoitorySpy, 'loadAll').mockRejectedValueOnce(throwError)
    const promise = sut.load()
    expect(promise).rejects.toThrow()
  })
})
