import { DbCheckSurveyById } from '@/data/usecases'
import { CheckSurveyByIdRepositorySpy } from '../mocks'
import { throwError } from '@/../tests/domain/mocks'

type SutTypes = {
  sut: DbCheckSurveyById
  checkSurveyByIdRepositorySpy: CheckSurveyByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkSurveyByIdRepositorySpy = new CheckSurveyByIdRepositorySpy()
  const sut = new DbCheckSurveyById(checkSurveyByIdRepositorySpy)
  return {
    sut,
    checkSurveyByIdRepositorySpy
  }
}

describe('DbCheckSurveyById', () => {
  test('Should call CheckSurveyByIdRepository with correct id', async () => {
    const { sut, checkSurveyByIdRepositorySpy } = makeSut()
    await sut.checkById('any_id')
    expect(checkSurveyByIdRepositorySpy.id).toBe('any_id')
  })

  test('Should return true on success', async () => {
    const { sut } = makeSut()
    const surveyExists = await sut.checkById('any_id')
    expect(surveyExists).toBe(true)
  })

  test('Should throw if CheckSurveyByIdRepository throws', async () => {
    const { sut, checkSurveyByIdRepositorySpy } = makeSut()
    jest.spyOn(checkSurveyByIdRepositorySpy, 'checkById').mockRejectedValueOnce(throwError)
    const promise = sut.checkById('any_id')
    expect(promise).rejects.toThrow()
  })
})
