import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, created, serverError } from '../../helpers'
import {
  AccountModel,
  AddAccount,
  Controller,
  EmailValidator,
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
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount,
    private readonly validation: Validation
  ) {}

  async handle(
    httpRequest: HttpRequest<HttpRequestDto>
  ): Promise<HttpResponse<AccountModel | Error>> {
    try {
      this.validation.validate(httpRequest.body)

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

      return created(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
