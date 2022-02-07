import { InvalidParamError } from '../../errors'
import { EmailValidator } from '../../protocols/email-validator'
import { Validation } from './validation'

export class EmailValidation implements Validation {
  private readonly fildName: string
  private readonly emailValidator: EmailValidator

  constructor (fildName: string, emailValidator: EmailValidator) {
    this.fildName = fildName
    this.emailValidator = emailValidator
  }

  validate (input: any): Error | null {
    const isValid = this.emailValidator.isValid(input[this.fildName])
    if (!isValid) {
      return new InvalidParamError(this.fildName)
    }
    return null
  }
}
