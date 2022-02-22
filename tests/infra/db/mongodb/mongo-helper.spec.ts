import { MongoHelper as sut } from '@/infra/db/mongodb/helpers/mongo-helper'

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(String(process.env.MONGO_URL))
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('Should reconnect if mongodb is down', async () => {
    const accountCollection = await sut.geCollection('accounts')
    expect(accountCollection).toBeTruthy()
    await sut.disconnect()
    const collection = await sut.geCollection('accounts')
    expect(collection).toBeTruthy()
  })
})
