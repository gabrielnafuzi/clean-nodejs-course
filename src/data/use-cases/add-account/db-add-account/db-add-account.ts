import { AccountModel } from '../../../../domain/models'
import { Encrypter } from '../../../protocols/encrypter'
import {
  AddAccountModel,
  AddAccount,
} from './../../../../domain/use-cases/add-account'

export class DbAddAccount implements AddAccount {
  constructor(private readonly encrypter: Encrypter) {}

  async add(account: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password)

    return await new Promise((resolve) => resolve(null))
  }
}
