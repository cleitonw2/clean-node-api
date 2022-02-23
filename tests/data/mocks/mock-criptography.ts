import { Hasher } from '@/data/protocols/criptography/hasher'

export class HasherSpy implements Hasher {
  hashedPassword = 'any_password'
  value: string

  async hash (value: string): Promise<string> {
    this.value = value
    return this.hashedPassword
  }
}
