import { ObjectId } from 'mongodb'
import { AccountModel } from '@/domain/models/account'
import { AddAccountParams } from '@/domain/usecases/add-account'
import { AddAccountRepository, LoadAccountByEmailRepository, LoadAccountByTokenRepository, UpdateAccessTokenRepository } from '@/data/protocols'
import { MongoHelper } from './mongo-helper'

export class AccountMongoRepository implements AddAccountRepository,
LoadAccountByEmailRepository, UpdateAccessTokenRepository, LoadAccountByTokenRepository {
  async add (accountData: AddAccountParams): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne({ ...accountData })
    const id = result.insertedId.toString()
    return { id, ...accountData }
  }

  async loadByEmail (email: string): Promise<AccountModel | null> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.findOne({ email })
    return result && MongoHelper.map(result)
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts')
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
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.findOne({
      accessToken: token,
      $or: [{
        role
      }, {
        role: 'admin'
      }]
    })
    return result && MongoHelper.map(result)
  }
}
