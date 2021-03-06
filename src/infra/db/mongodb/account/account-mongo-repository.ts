import { WithId } from 'mongodb'

import { AddAccountRepository } from '../../../../data/protocols/db/account/add-account-repository'
import { LoadAccountByEmailRepository } from '../../../../data/protocols/db/account/load-account-by-email-repository'
import { AccountModel } from '../../../../domain/models'
import { AddAccountModel } from '../../../../domain/use-cases'
import { MongoHelper } from '../helpers/mongo-helper'
import { UpdateAccessTokenRepository } from './../../../../data/protocols/db/account/update-access-token-repository'

export class AccountMongoRepository
  implements
    AddAccountRepository,
    LoadAccountByEmailRepository,
    UpdateAccessTokenRepository
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

  async updateAccessToken(id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection<
      WithId<AccountModel>
    >('accounts')

    await accountCollection.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          accessToken: token,
        },
      }
    )
  }
}
