import { MissingParamError } from '../../errors'
import { Validation } from '../../protocols/validation'
import { ValidationComposite } from './validation-composite'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}

interface SutTypes {
  sut: ValidationComposite
  validationsStub: Validation[]
}

const makeSut = (): SutTypes => {
  const validationsStub = [
    makeValidation(),
    makeValidation()
  ]
  const sut = new ValidationComposite(validationsStub)
  return {
    sut,
    validationsStub
  }
}

describe('Validation Composite', () => {
  test('Should return an error if any validation fails', () => {
    const { sut, validationsStub } = makeSut()
    jest.spyOn(validationsStub[0], 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('Should return the first error if more then one validation fails', () => {
    const { sut, validationsStub } = makeSut()
    jest.spyOn(validationsStub[0], 'validate').mockReturnValueOnce(new Error())
    jest.spyOn(validationsStub[1], 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new Error())
  })

  test('Should return null if validation succeeds', () => {
    const { sut } = makeSut()
    const error = sut.validate({ field: 'any_value' })
    expect(error).toBeNull()
  })
})
