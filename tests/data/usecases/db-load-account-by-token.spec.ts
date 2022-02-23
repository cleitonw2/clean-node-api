import { DbLoadAccountByToken } from '@/data/usecases/account/load-account-by-token/db-load-account-by-token'
import { throwError } from '../../domain/mocks/test-helper'
import { DecrypterSpy, LoadAccountByTokenRepositorySpy } from '../mocks'

type SutTypes = {
  sut: DbLoadAccountByToken
  decrypterSpy: DecrypterSpy
  loadAccountByTokenRepositorySpy: LoadAccountByTokenRepositorySpy
}

const makeSut = (): SutTypes => {
  const decrypterSpy = new DecrypterSpy()
  const loadAccountByTokenRepositorySpy = new LoadAccountByTokenRepositorySpy()
  const sut = new DbLoadAccountByToken(decrypterSpy, loadAccountByTokenRepositorySpy)
  return {
    sut,
    decrypterSpy,
    loadAccountByTokenRepositorySpy
  }
}

describe('DbLoadAccountByToken Usecase', () => {
  test('Should call Decrypter with correct value', async () => {
    const { sut, decrypterSpy } = makeSut()
    await sut.loadByToken('any_token', 'any_role')
    expect(decrypterSpy.value).toBe('any_token')
  })

  test('Should return null if Decrypter returns null', async () => {
    const { sut, decrypterSpy } = makeSut()
    decrypterSpy.result = null
    const account = await sut.loadByToken('any_token', 'any_role')
    expect(account).toBeNull()
  })

  test('Should call LoadAccountBytokenRepository with correct values', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    await sut.loadByToken('any_token', 'any_role')
    expect(loadAccountByTokenRepositorySpy.token).toBe('any_token')
    expect(loadAccountByTokenRepositorySpy.role).toBe('any_role')
  })

  test('Should return null if LoadAccountBytokenRepository returns null', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    loadAccountByTokenRepositorySpy.accountModel = null as any
    const account = await sut.loadByToken('any_token', 'any_role')
    expect(account).toBeNull()
  })

  test('Should return an account on success', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    const account = await sut.loadByToken('any_token', 'any_role')
    expect(account).toEqual(loadAccountByTokenRepositorySpy.accountModel)
  })

  test('Should throw if Decrypter throws', async () => {
    const { sut, decrypterSpy } = makeSut()
    jest.spyOn(decrypterSpy, 'decrypt').mockRejectedValueOnce(throwError)
    const promise = sut.loadByToken('any_token', 'any_role')
    await expect(promise).rejects.toThrow()
  })

  test('Should throw if LoadAccountBytokenRepository throws', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    jest.spyOn(loadAccountByTokenRepositorySpy, 'loadByToken').mockRejectedValueOnce(throwError)
    const promise = sut.loadByToken('any_token', 'any_role')
    await expect(promise).rejects.toThrow()
  })
})