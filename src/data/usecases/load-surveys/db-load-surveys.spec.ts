import MockDate from 'mockdate'
import { DbLoadSurveys } from './db-load-surveys'
import { SurveyModel } from '@/domain/models/survey'
import { LoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository'

const makeFakeSurveys = (): SurveyModel[] => ([{
  id: 'any_id',
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }],
  date: new Date()
}])

const makeLoadSurveysRepository = (): LoadSurveysRepository => {
  class LoadSurveysRepositoryStub implements LoadSurveysRepository {
    async loadAll (): Promise<SurveyModel[]> {
      return new Promise(resolve => resolve(makeFakeSurveys()))
    }
  }
  return new LoadSurveysRepositoryStub()
}

type SutTypes = {
  sut: DbLoadSurveys
  loadSurveysRepsoitoryStub: LoadSurveysRepository
}

const makeSut = (): SutTypes => {
  const loadSurveysRepsoitoryStub = makeLoadSurveysRepository()
  const sut = new DbLoadSurveys(loadSurveysRepsoitoryStub)
  return {
    sut,
    loadSurveysRepsoitoryStub
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
    const { sut, loadSurveysRepsoitoryStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadSurveysRepsoitoryStub, 'loadAll')
    await sut.load()
    expect(loadAllSpy).toBeCalled()
  })

  test('Should return a list of surveys on success', async () => {
    const { sut } = makeSut()
    const surveys = await sut.load()
    expect(surveys).toEqual(makeFakeSurveys())
  })

  test('Should throw if LoadSurveysRepository throws', async () => {
    const { sut, loadSurveysRepsoitoryStub } = makeSut()
    jest.spyOn(loadSurveysRepsoitoryStub, 'loadAll').mockRejectedValueOnce(Error())
    const promise = sut.load()
    expect(promise).rejects.toThrow()
  })
})
