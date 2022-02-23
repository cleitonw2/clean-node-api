import {
  AddAccountParams,
  AccountModel,
  LoadAccountByEmailRepository
} from '@/data/usecases/account/add-account/db-add-account-protocols'
import { AddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
import { mockAccountModel } from '@/../tests/domain/mocks'
import { UpdateAccessTokenRepository } from '@/data/protocols/db/account/update-access-token-repository'
import { LoadAccountByTokenRepository } from '../protocols/db/account/load-account-by-token-repository'

export class AddAccountRepositorySpy implements AddAccountRepository {
  accountModel: AccountModel = mockAccountModel()
  addAccountParams: AddAccountParams

  async add (data: AddAccountParams): Promise<AccountModel> {
    this.addAccountParams = data
    return this.accountModel
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
