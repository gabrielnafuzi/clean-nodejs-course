import { WithId } from 'mongodb'

import { AddAccountRepository } from '../../../../data/protocols/db/add-account-repository'
import { LoadAccountByEmailRepository } from '../../../../data/protocols/db/load-account-by-email-repository'
import { AccountModel } from '../../../../domain/models'
import { AddAccountModel } from '../../../../domain/use-cases'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository
  implements AddAccountRepository, LoadAccountByEmailRepository
{
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection<AddAccountModel>(
      'accounts'
    )

    const result = await accountCollection.insertOne(accountData)

    return MongoHelper.mapToModel<AddAccountModel>(result.ops[0])
  }

  async loadByEmail(email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection<
      WithId<AccountModel>
    >('accounts')

    const account = await accountCollection.findOne({ email })

    return MongoHelper.mapToModel<WithId<AccountModel>>(account)
  }
}
