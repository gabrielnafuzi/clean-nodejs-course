import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, serverError } from '../../helpers'
import {
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

  handle(httpRequest: HttpRequest<HttpRequestBody>): HttpResponse {
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

      const account = this.addAccount.add({
        name,
        email,
        password,
      })

      return {
        statusCode: 201,
        body: account,
      }
    } catch {
      return serverError()
    }
  }
}
