import { AccountModel } from '../../../../domain/models'
import { AddAccountModel } from '../../../../domain/use-cases/add-account'

export interface AddAccountRepository {
  add: (accountData: AddAccountModel) => Promise<AccountModel>
}
