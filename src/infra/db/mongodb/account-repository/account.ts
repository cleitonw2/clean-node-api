import { ObjectId } from 'mongodb'
import { AddAccountRepository } from '../../../../data/protocols/db/add-account-repository'
import { LoadAccountByEmailRepository } from '../../../../data/protocols/db/load-account-by-email-repository'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'

interface AccountMongoModel {
  _id: ObjectId
  name: string
  email: string
  password: string
}

export class AccountMongoRepository implements AddAccountRepository,
LoadAccountByEmailRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.geCollection('accounts')
    const result = await accountCollection.insertOne({ ...accountData })
    const id = result.insertedId.toString()
    return { id, ...accountData }
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.geCollection('accounts')
    const { _id: id, ...rest } = await accountCollection.findOne({ email }) as AccountMongoModel
    return {
      id: id.toHexString(),
      ...rest
    }
  }
}
