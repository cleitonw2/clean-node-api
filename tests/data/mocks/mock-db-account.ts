import { AccountModel } from '@/domain/models'
import { AddAccount } from '@/domain/usecases'
import { AddAccountRepository, LoadAccountByTokenRepository, UpdateAccessTokenRepository } from '@/data/protocols/db'
import { mockAccountModel } from '@/../tests/domain/mocks'
import { LoadAccountByEmailRepository } from '../protocols'

export class AddAccountRepositorySpy implements AddAccountRepository {
  accountResult = true
  addAccountParams: AddAccount.Params

  async add (data: AddAccount.Params): Promise<AddAccount.Result> {
    this.addAccountParams = data
    return this.accountResult
  }
}

export class LoadAccountByEmailRepositorySpy implements LoadAccountByEmailRepository {
  email: string
  accountModel: AccountModel = mockAccountModel()

  async loadByEmail (email: string): Promise<AccountModel | null> {
    this.email = email
    return this.accountModel
  }
}

export class LoadAccountByTokenRepositorySpy implements LoadAccountByTokenRepository {
  token: string
  role?: string
  accountModel: AccountModel = mockAccountModel()

  async loadByToken (token: string, role?: string): Promise<AccountModel | null> {
    this.token = token
    this.role = role
    return this.accountModel
  }
}

export class UpdateAccessTokenRepositorySpy implements UpdateAccessTokenRepository {
  id: string
  token: string

  async updateAccessToken (id: string, token: string): Promise<void> {
    this.id = id
    this.token = token
  }
}
