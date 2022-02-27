import { AccountModel } from '@/domain/models/account'
import { AuthenticationModel } from '@/domain/models/authentication'
import { AddAccount, AddAccountParams } from '@/domain/usecases/account/add-account'
import { Authentication, AuthenticationParams } from '@/domain/usecases/account/authentication'
import { LoadAccountByToken } from '@/domain/usecases/account/load-account-by-token'
import { mockAccountModel, mockAuthenticationModel } from '@/../tests/domain/mocks'

export class AddAccountSpy implements AddAccount {
  addAccount: AddAccountParams
  accountModel = mockAccountModel()

  async add (account: AddAccountParams): Promise<AccountModel> {
    this.addAccount = account
    return this.accountModel
  }
}

export class AuthenticationSpy implements Authentication {
  authenticationParams: AuthenticationParams
  authenticationModel = mockAuthenticationModel()

  async auth (authentication: AuthenticationParams): Promise<AuthenticationModel> {
    this.authenticationParams = authentication
    return this.authenticationModel
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
