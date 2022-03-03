import { Validation } from '@/presentation/protocols'

export class ValidationSpy implements Validation {
  result: Error = null as any
  input: any

  validate (input: any): Error | null {
    this.input = input
    return this.result
  }
}
