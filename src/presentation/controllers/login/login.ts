import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, serverError } from '../../helpers'
import { Controller, HttpResponse } from '../../protocols'
import { Authentication } from './../../../domain/use-cases/authentication'
import { EmailValidator } from './../../protocols/email-validator'
import { HttpRequest } from './../../protocols/http'

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
      const { email, password } = httpRequest.body

      if (!email) {
        return await new Promise((resolve) =>
          resolve(badRequest(new MissingParamError('email')))
        )
      }

      if (!password) {
        return await new Promise((resolve) =>
          resolve(badRequest(new MissingParamError('password')))
        )
      }

      const isValid = this.emailValidator.isValid(email)

      if (!isValid) {
        return await new Promise((resolve) =>
          resolve(badRequest(new InvalidParamError('email')))
        )
      }

      await this.authentication.auth(email, password)
    } catch (error) {
      return serverError(error)
    }
  }
}
