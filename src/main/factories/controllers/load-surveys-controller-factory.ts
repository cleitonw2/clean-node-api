import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { Controller } from '@/presentation/protocols'
import { LoadSurveysController } from '@/presentation/controllers'
import { makeDbLoadSurveys } from '@/main/factories/usecases'

export const makeLoadSurveysController = (): Controller => {
  const controller = new LoadSurveysController(makeDbLoadSurveys())
  return makeLogControllerDecorator(controller)
}
