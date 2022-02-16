import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { AccountModel } from '../../../../domain/models'
import { AddAccountModel } from '../../../../domain/use-cases'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection =
      MongoHelper.getCollection<AddAccountModel>('accounts')

    const result = await accountCollection.insertOne(accountData)
    const account = result.ops[0]
    const { _id, ...accountWithoutId } = account

    return {
      ...accountWithoutId,
      id: _id,
    }
  }
}
