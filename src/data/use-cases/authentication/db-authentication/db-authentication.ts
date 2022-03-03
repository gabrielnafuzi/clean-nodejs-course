import {
  Authentication,
  AuthenticationModel,
} from '../../../../domain/use-cases/authentication'
import { LoadAccountByEmailRepository } from '../../../protocols/load-account-by-email-repository'

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async auth(authentication: AuthenticationModel): Promise<string> {
    await this.loadAccountByEmailRepository.load(authentication.email)

    return null
  }
}
