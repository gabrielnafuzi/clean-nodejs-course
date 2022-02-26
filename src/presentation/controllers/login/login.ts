import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, ok, serverError, unauthorized } from '../../helpers'
import {
  Controller,
  HttpResponse,
  Authentication,
  EmailValidator,
  HttpRequest,
} from './login-protocols'

interface HttpRequestDto {
  email?: string
  password?: string
}

export class LoginController implements Controller {
  constructor(
    private readonly emailValidator: EmailValidator,
    private readonly authentication: Authentication
  ) {}

  async handle(
    httpRequest: HttpRequest<HttpRequestDto>
  ): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { email, password } = httpRequest.body

      const isValid = this.emailValidator.isValid(email)

      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      const accessToken = await this.authentication.auth(email, password)

      if (!accessToken) {
        return unauthorized()
      }

      return ok({
        accessToken,
      })
    } catch (error) {
      return serverError(error)
    }
  }
}
