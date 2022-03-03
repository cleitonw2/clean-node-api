import { Authentication, AddAccount, LoadAccountByToken } from '@/domain/usecases'
import { mockAuthenticationModel } from '@/../tests/domain/mocks'

export class AddAccountSpy implements AddAccount {
  addAccount: AddAccount.Params
  result: boolean = true

  async add (account: AddAccount.Params): Promise<AddAccount.Result> {
    this.addAccount = account
    return this.result
  }
}

export class AuthenticationSpy implements Authentication {
  authenticationParams: Authentication.Params
  result = mockAuthenticationModel()

  async auth (authentication: Authentication.Params): Promise<Authentication.Result> {
    this.authenticationParams = authentication
    return this.result
  }
}

export class LoadAccountByTokenSpy implements LoadAccountByToken {
  role?: string
  accessToken: string
  result = {
    id: 'any_id'
  }

  constructor (role?: string) {
    this.role = role
  }

  async loadByToken (accessToken: string): Promise<LoadAccountByToken.Result | null> {
    this.accessToken = accessToken
    return this.result
  }
}
