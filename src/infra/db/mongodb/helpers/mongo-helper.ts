import { MongoClient, WithId } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,
  uri: null as string,

  async connect(uri: string) {
    this.uri = uri

    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  },

  async disconnect() {
    await this.client.close()
    this.client = null
  },

  async getCollection<T = unknown>(name: string) {
    if (!this.client) {
      await this.connect(this.uri)
    }

    return this.client.db().collection<T>(name)
  },

  mapToModel<T = unknown>(collection: WithId<T> | null) {
    if (!collection) {
      return null
    }

    const { _id, ...collectionWithoutId } = collection

    return {
      ...collectionWithoutId,
      id: _id,
    }
  },
}
