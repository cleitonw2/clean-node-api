import { EmailValidator } from '@/validation/protocols/email-validator'

export class EmailValidatorSpy implements EmailValidator {
  email: string
  isValidEmail: boolean = true

  isValid (email: string): boolean {
    this.email = email
    return this.isValidEmail
  }
}
