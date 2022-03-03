import MockDate from 'mockdate'
import { DbLoadSurveys } from '@/data/usecases'
import { LoadSurveysRepositorySpy } from '../mocks'
import { throwError } from '@/../tests/domain/mocks'

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
    await sut.load('any_account_id')
    expect(loadSurveysRepsoitorySpy.accountId).toBe('any_account_id')
  })

  test('Should return a list of surveys on success', async () => {
    const { sut, loadSurveysRepsoitorySpy } = makeSut()
    const surveys = await sut.load('any_account_id')
    expect(surveys).toEqual(loadSurveysRepsoitorySpy.result)
  })

  test('Should throw if LoadSurveysRepository throws', async () => {
    const { sut, loadSurveysRepsoitorySpy } = makeSut()
    jest.spyOn(loadSurveysRepsoitorySpy, 'loadAll').mockRejectedValueOnce(throwError)
    const promise = sut.load('any_account_id')
    expect(promise).rejects.toThrow()
  })
})
