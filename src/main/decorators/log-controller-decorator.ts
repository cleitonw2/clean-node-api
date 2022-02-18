import { LogErrorRepository } from '@/data/protocols/db/log/log-error-repository'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class LogControllerDecorator implements Controller {
  constructor (
    private readonly controller: Controller,
    private readonly logErrorRepository: LogErrorRepository
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)
    const isServerError = httpResponse.statusCode === 500
    if (isServerError) {
      await this.logErrorRepository.logError(httpResponse.body.stack)
    }
    return httpResponse
  }
}
