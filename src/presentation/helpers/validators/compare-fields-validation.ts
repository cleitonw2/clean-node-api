import { InvalidParamError } from '../../errors'
import { Validation } from './validation'

export class CompareFieldsValidation implements Validation {
  private readonly fildName: string
  private readonly fildToCompareName: string

  constructor (fildName: string, fildToCompareName: string) {
    this.fildName = fildName
    this.fildToCompareName = fildToCompareName
  }

  validate (input: any): Error | null {
    if (input[this.fildName] !== input[this.fildToCompareName]) {
      return new InvalidParamError(this.fildToCompareName)
    }
    return null
  }
}
