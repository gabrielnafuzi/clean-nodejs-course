import { badRequest, created, serverError } from '../../helpers'
import {
  AccountModel,
  AddAccount,
  Controller,
  HttpRequest,
  HttpResponse,
  Validation,
} from './signup-protocols'

interface HttpRequestDto {
  name?: string
  email?: string
  password?: string
  passwordConfirmation?: string
}

export class SignUpController implements Controller {
  constructor(
    private readonly addAccount: AddAccount,
    private readonly validation: Validation
  ) {}

  async handle(
    httpRequest: HttpRequest<HttpRequestDto>
  ): Promise<HttpResponse<AccountModel | Error>> {
    try {
      const error = this.validation.validate(httpRequest.body)

      if (error) {
        return badRequest(error)
      }

      const { name, email, password } = httpRequest.body

      const account = await this.addAccount.add({
        name,
        email,
        password,
      })

      return created(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
