import { AddAccount } from '@/domain/usecases'
import { AddAccountRepository, Hasher, LoadAccountByEmailRepository } from '@/data/protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async add (accountData: AddAccount.Params): Promise<AddAccount.Result> {
    const accountAlreadyExists = await this.loadAccountByEmailRepository.loadByEmail(accountData.email)
    let newAccount = false
    if (!accountAlreadyExists) {
      const hashedPassword = await this.hasher.hash(accountData.password)
      newAccount = await this.addAccountRepository.add({ ...accountData, password: hashedPassword })
    }
    return newAccount
  }
}
