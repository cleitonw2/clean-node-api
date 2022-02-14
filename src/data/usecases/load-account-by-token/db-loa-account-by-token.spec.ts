import { DbLoadAccountByToken } from './db-loa-account-by-token'
import { Decrypter } from '../../protocols/criptography/decrypter'

describe('DbLoadAccountByToken Usecase', () => {
  test('Should call Decrypter with correct value', async () => {
    class DecrypterStub implements Decrypter {
      async decrypt (value: string): Promise<string | null> {
        return new Promise(resolve => resolve('any_value'))
      }
    }
    const decrypterStub = new DecrypterStub()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    const sut = new DbLoadAccountByToken(decrypterStub)
    sut.loadByToken('any_token')
    expect(decryptSpy).toBeCalledWith('any_token')
  })
})
