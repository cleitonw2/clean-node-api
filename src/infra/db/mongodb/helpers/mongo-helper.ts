import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null,

  async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri)
  },

  async disconnect (): Promise<void> {
    this.client.close()
  },

  geCollection (name: string): Collection {
    return this.client.db().collection(name)
  }
}
