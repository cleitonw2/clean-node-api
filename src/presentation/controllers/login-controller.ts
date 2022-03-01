import { Controller, HttpRequest, HttpResponse, Validation } from '../protocols'
import { badRequest, serverError, ok, unauthorized } from '@/presentation/helpers'
import { Authentication } from '@/domain/usecases'

export class LoginController implements Controller {
  constructor (
    private readonly authentication: Authentication,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { email, password } = httpRequest.body
      const authModel = await this.authentication.auth({
        email,
        password
      })
      if (!authModel) {
        return unauthorized()
      }
      return ok(authModel)
    } catch (error) {
      return serverError(error)
    }
  }
}
