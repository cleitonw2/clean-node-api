import {
  AddAccountParams,
  AccountModel,
  LoadAccountByEmailRepository
} from '@/data/usecases/account/add-account/db-add-account-protocols'
import { AddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
import { mockAccountModel } from '@/../tests/domain/mocks'

export class AddAccountRepositorySpy implements AddAccountRepository {
  accountModel = mockAccountModel()
  addAccountParams: AddAccountParams

  async add (data: AddAccountParams): Promise<AccountModel> {
    this.addAccountParams = data
    return this.accountModel
  }
}

export class LoadAccountByEmailRepositorySpy implements LoadAccountByEmailRepository {
  email: string
  accountModel = null

  async loadByEmail (email: string): Promise<AccountModel | null> {
    this.email = email
    return this.accountModel
  }
}
