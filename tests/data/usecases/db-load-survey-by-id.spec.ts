import MockDate from 'mockdate'
import { DbLoadSurveyById } from '@/data/usecases'
import { LoadSurveyByIdRepositorySpy } from '../mocks'
import { throwError } from '../../domain/mocks/test-helper'

type SutTypes = {
  sut: DbLoadSurveyById
  loadSurveyByIdRepositorySpy: LoadSurveyByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdRepositorySpy = new LoadSurveyByIdRepositorySpy()
  const sut = new DbLoadSurveyById(loadSurveyByIdRepositorySpy)
  return {
    sut,
    loadSurveyByIdRepositorySpy
  }
}

describe('DbLoadSurveyById', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveyByIdRepsoitory with correct id', async () => {
    const { sut, loadSurveyByIdRepositorySpy } = makeSut()
    await sut.loadById('any_id')
    expect(loadSurveyByIdRepositorySpy.id).toBe('any_id')
  })

  test('Should return Survey on success', async () => {
    const { sut, loadSurveyByIdRepositorySpy } = makeSut()
    const surveys = await sut.loadById('any_id')
    expect(surveys).toEqual(loadSurveyByIdRepositorySpy.suveyModel)
  })

  test('Should throw if LoadSurveyByIdRepository throws', async () => {
    const { sut, loadSurveyByIdRepositorySpy } = makeSut()
    jest.spyOn(loadSurveyByIdRepositorySpy, 'loadById').mockRejectedValueOnce(throwError)
    const promise = sut.loadById('any_id')
    expect(promise).rejects.toThrow()
  })
})
