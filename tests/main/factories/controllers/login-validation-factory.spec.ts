import {
  EmailValidation,
  RequiredFieldValidation,
  ValidationComposite
} from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'
import { EmailValidator } from '@/validation/protocols/email-validator'
import { makeLoginValidation } from '@/main/factories/controllers/login-validation-factory'
import { EmailValidatorStub } from '@/../tests/validation/mocks'

jest.mock('@/validation/validators/validation-composite')

const makeEmailValidator = (): EmailValidator => new EmailValidatorStub()

describe('LoginValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeLoginValidation()
    const validations: Validation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
