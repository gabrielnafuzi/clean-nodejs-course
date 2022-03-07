import { LogErrorRepository } from '../../../../data/protocols/db/log/log-error'
import { MongoHelper } from '../helpers/mongo-helper'

interface ErrorCollection {
  date: string | Date
  stack: string
}

export class LogMongoRepository implements LogErrorRepository {
  async logError(stack: string) {
    const errorCollection = await MongoHelper.getCollection<ErrorCollection>(
      'errors'
    )

    errorCollection.insertOne({
      stack,
      date: new Date(),
    })
  }
}
