import { MissingParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols/validation'

export class RequiredFieldValidation implements Validation {
  constructor (private readonly fildName: string) {}

  validate (input: any): Error | null {
    if (!input[this.fildName]) return new MissingParamError(this.fildName)
    return null
  }
}
