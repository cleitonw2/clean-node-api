import { Hasher } from '@/data/protocols/criptography/hasher'
import { HashComparer } from '@/data/protocols/criptography/hash-comparer'
import { Encrypter } from '@/data/protocols/criptography/encrypter'
import { Decrypter } from '../protocols/criptography/decrypter'

export class HasherSpy implements Hasher {
  result = 'any_password'
  value: string

  async hash (value: string): Promise<string> {
    this.value = value
    return this.result
  }
}

export class HashComparerSpy implements HashComparer {
  value: string
  hash: string
  result: boolean = true

  async compare (value: string, hash: string): Promise<boolean> {
    this.value = value
    this.hash = hash
    return this.result
  }
}

export class EncrypterSpy implements Encrypter {
  value: string
  result = 'any_token'

  async encrypt (value: string): Promise<string> {
    this.value = value
    return this.result
  }
}

export class DecrypterSpy implements Decrypter {
  value: string
  result: string | null = 'any_value'

  async decrypt (value: string): Promise<string | null> {
    this.value = value
    return this.result
  }
}
