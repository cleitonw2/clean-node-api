import { DbLoadAnswersBySurvey } from '@/data/usecases'
import { LoadSurveyByIdRepositorySpy } from '../mocks'
import { throwError } from '../../domain/mocks/test-helper'

type SutTypes = {
  sut: DbLoadAnswersBySurvey
  loadSurveyByIdRepositorySpy: LoadSurveyByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdRepositorySpy = new LoadSurveyByIdRepositorySpy()
  const sut = new DbLoadAnswersBySurvey(loadSurveyByIdRepositorySpy)
  return {
    sut,
    loadSurveyByIdRepositorySpy
  }
}

describe('DbLoadAnswersBySurvey', () => {
  test('Should call LoadSurveyByIdRepsoitory with correct id', async () => {
    const { sut, loadSurveyByIdRepositorySpy } = makeSut()
    await sut.loadAnswers('any_id')
    expect(loadSurveyByIdRepositorySpy.id).toBe('any_id')
  })

  test('Should return an empty array if LoadSurveyByIdRepsoitory returns null', async () => {
    const { sut, loadSurveyByIdRepositorySpy } = makeSut()
    loadSurveyByIdRepositorySpy.result = null as any
    const surveys = await sut.loadAnswers('any_id')
    expect(surveys).toEqual([])
  })

  test('Should return answers on success', async () => {
    const { sut, loadSurveyByIdRepositorySpy } = makeSut()
    const surveys = await sut.loadAnswers('any_id')
    const answers = loadSurveyByIdRepositorySpy.result.answers.map(a => a.answer)
    expect(surveys).toEqual(answers)
  })

  test('Should throw if LoadSurveyByIdRepository throws', async () => {
    const { sut, loadSurveyByIdRepositorySpy } = makeSut()
    jest.spyOn(loadSurveyByIdRepositorySpy, 'loadById').mockRejectedValueOnce(throwError)
    const promise = sut.loadAnswers('any_id')
    expect(promise).rejects.toThrow()
  })
})
