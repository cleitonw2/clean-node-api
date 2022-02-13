import { AddSurvey, Controller, HttpRequest, HttpResponse, Validation } from './add-survey-protocols'
import { badRequest, ok } from '../../../helpers/http/http-helper'

export class AddSurveyController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addSurvey: AddSurvey
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error) {
      return badRequest(error)
    }
    const { question, answers } = httpRequest.body
    await this.addSurvey.add({
      question,
      answers
    })
    return ok({ statusCode: 0, body: {} })
  }
}
