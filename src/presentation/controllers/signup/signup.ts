import { InvalidParamError, MissingParamError, ServerError } from '../../errors'
import { badRequest } from '../../helpers'
import {
  Controller,
  EmailValidator,
  HttpRequest,
  HttpResponse,
} from '../../protocols'

interface HttpRequestBody {
  name?: string
  email?: string
  password?: string
  passwordConfirmation?: string
}

export class SignUpController implements Controller {
  constructor(private readonly emailValidator: EmailValidator) {}

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

      const isEmailValid = this.emailValidator.isValid(httpRequest.body.email)

      if (!isEmailValid) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: new ServerError(),
      }
    }
  }
}
