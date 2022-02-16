import { MongoClient, WithId } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,

  async connect(uri: string) {
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  },

  async disconnect() {
    await this.client.close()
  },

  getCollection<T = unknown>(name: string) {
    return this.client.db().collection<T>(name)
  },

  mapToModel<T = unknown>(collection: WithId<T>) {
    const { _id, ...collectionWithoutId } = collection

    return {
      ...collectionWithoutId,
      id: _id,
    }
  },
}
