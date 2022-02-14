import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers'
import {
  AccountModel,
  AddAccount,
  Controller,
  EmailValidator,
  HttpRequest,
  HttpResponse,
} from './signup-protocols'

interface HttpRequestBody {
  name?: string
  email?: string
  password?: string
  passwordConfirmation?: string
}

export class SignUpController implements Controller {
  constructor(
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount
  ) {}

  async handle(
    httpRequest: HttpRequest<HttpRequestBody>
  ): Promise<HttpResponse<AccountModel | Error>> {
    try {
      const requiredFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation',
      ]

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { name, email, password, passwordConfirmation } = httpRequest.body

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isEmailValid = this.emailValidator.isValid(email)

      if (!isEmailValid) {
        return badRequest(new InvalidParamError('email'))
      }

      const account = await this.addAccount.add({
        name,
        email,
        password,
      })

      return ok(account, 201)
    } catch (error) {
      console.error(error)

      return serverError()
    }
  }
}
