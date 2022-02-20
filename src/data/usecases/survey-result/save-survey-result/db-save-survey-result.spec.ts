import {
  SaveSurveyResultRepository,
  SurveyResultModel,
  SaveSurveyResultModel
} from './db-save-survey-result-protocols'
import { DbSaveSurveyResult } from './db-save-survey-result'
import MockDate from 'mockdate'

const makeSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
      return new Promise(resolve => resolve(makeFakeSurveyResult()))
    }
  }
  return new SaveSurveyResultRepositoryStub()
}

const makeFakeSurveyResultData = (): SaveSurveyResultModel => ({
  surveyId: 'any_survey-id',
  accountId: 'any_account_id',
  answer: 'any_answer_id',
  date: new Date()
})

const makeFakeSurveyResult = (): SurveyResultModel => ({
  id: 'any_id',
  ...makeFakeSurveyResultData()
})

type SutTypes = {
  sut: DbSaveSurveyResult
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository
}

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = makeSaveSurveyResultRepository()
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub)
  return {
    sut,
    saveSurveyResultRepositoryStub
  }
}

describe('DbSaveSurveyResult Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call SaveSurveyResultRepository with correct values', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    const saveSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save')
    sut.save(makeFakeSurveyResultData())
    expect(saveSpy).toHaveBeenCalledWith(makeFakeSurveyResultData())
  })

  test('Should throw if SaveSurveyResultRepository throws', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(saveSurveyResultRepositoryStub, 'save').mockRejectedValueOnce(new Error())
    const promise = sut.save(makeFakeSurveyResultData())
    await expect(promise).rejects.toThrow()
  })

  test('Should return a SurveyResult on success', async () => {
    const { sut } = makeSut()
    const surveyResult = await sut.save(makeFakeSurveyResultData())
    expect(surveyResult).toEqual(makeFakeSurveyResult())
  })
})
