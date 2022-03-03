import { AddAccount } from '@/domain/usecases'
import { AddAccountRepository, LoadAccountByTokenRepository, UpdateAccessTokenRepository } from '@/data/protocols/db'
import { LoadAccountByEmailRepository, CheckAccountByEmailRepository } from '../protocols'

export class AddAccountRepositorySpy implements AddAccountRepository {
  result: boolean = true
  addAccountParams: AddAccount.Params

  async add (data: AddAccount.Params): Promise<AddAccount.Result> {
    this.addAccountParams = data
    return this.result
  }
}

export class CheckAccountByEmailRepositorySpy implements CheckAccountByEmailRepository {
  email: string
  result = false

  async checkByEmail (email: string): Promise<CheckAccountByEmailRepository.Result> {
    this.email = email
    return this.result
  }
}

export class LoadAccountByEmailRepositorySpy implements LoadAccountByEmailRepository {
  email: string
  result = {
    id: 'any_id',
    name: 'any_name',
    password: 'any_password'
  }

  async loadByEmail (email: string): Promise<LoadAccountByEmailRepository.Result> {
    this.email = email
    return this.result
  }
}

export class LoadAccountByTokenRepositorySpy implements LoadAccountByTokenRepository {
  token: string
  role?: string
  result = {
    id: 'any_id'
  }

  async loadByToken (token: string, role?: string): Promise<LoadAccountByTokenRepository.Result | null> {
    this.token = token
    this.role = role
    return this.result
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
