import { ObjectId } from 'mongodb'
import { AddAccountRepository } from '../../../../data/protocols/db/account/add-account-repository'
import { LoadAccountByEmailRepository } from '../../../../data/protocols/db/account/load-account-by-email-repository'
import { LoadAccountByTokenRepository } from '../../../../data/protocols/db/account/load-account-by-token-repository'
import { UpdateAccessTokenRepository } from '../../../../data/protocols/db/account/update-access-token-repository'
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
LoadAccountByEmailRepository, UpdateAccessTokenRepository, LoadAccountByTokenRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.geCollection('accounts')
    const result = await accountCollection.insertOne({ ...accountData })
    const id = result.insertedId.toString()
    return { id, ...accountData }
  }

  async loadByEmail (email: string): Promise<AccountModel | null> {
    const accountCollection = await MongoHelper.geCollection('accounts')
    const result = await accountCollection.findOne({ email }) as AccountMongoModel
    return result && MongoHelper.map(result)
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.geCollection('accounts')
    await accountCollection.updateOne({
      _id: new ObjectId(id)
    },
    {
      $set: {
        accessToken: token
      }
    }
    )
  }

  async loadByToken (token: string, role?: string): Promise<AccountModel | null> {
    const accountCollection = await MongoHelper.geCollection('accounts')
    const result = await accountCollection.findOne({
      accessToken: token,
      role
    }) as AccountMongoModel
    return result && MongoHelper.map(result)
  }
}
