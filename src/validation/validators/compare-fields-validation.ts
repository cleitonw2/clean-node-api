import { InvalidParamError } from '../../presentation/errors'
import { Validation } from '../../presentation/protocols/validation'

export class CompareFieldsValidation implements Validation {
  constructor (
    private readonly fildName: string,
    private readonly fildToCompareName: string
  ) {}

  validate (input: any): Error | null {
    if (input[this.fildName] !== input[this.fildToCompareName]) {
      return new InvalidParamError(this.fildToCompareName)
    }
    return null
  }
}
