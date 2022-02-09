import { InvalidParamError } from '../../errors'
import { Validation } from '../../protocols/validation'

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
