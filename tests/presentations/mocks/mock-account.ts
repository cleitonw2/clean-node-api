import { AccountModel } from '@/domain/models/account'
import { Authentication, AddAccount, LoadAccountByToken } from '@/domain/usecases'
import { mockAccountModel, mockAuthenticationModel } from '@/../tests/domain/mocks'

export class AddAccountSpy implements AddAccount {
  addAccount: AddAccount.Params
  accountModel = true

  async add (account: AddAccount.Params): Promise<AddAccount.Result> {
    this.addAccount = account
    return this.accountModel
  }
}

export class AuthenticationSpy implements Authentication {
  authenticationParams: Authentication.Params
  authenticationResult = mockAuthenticationModel()

  async auth (authentication: Authentication.Params): Promise<Authentication.Result> {
    this.authenticationParams = authentication
    return this.authenticationResult
  }
}

export class LoadAccountByTokenSpy implements LoadAccountByToken {
  role?: string
  accessToken: string
  accountModel = mockAccountModel()

  constructor (role?: string) {
    this.role = role
  }

  async loadByToken (accessToken: string): Promise<AccountModel | null> {
    this.accessToken = accessToken
    return this.accountModel
  }
}
