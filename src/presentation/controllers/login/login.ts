import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers'
import { Controller, HttpResponse } from '../../protocols'
import { HttpRequest } from './../../protocols/http'

interface HttpRequestDto {
  email?: string
  password?: string
}

export class LoginController implements Controller {
  async handle(
    httpRequest: HttpRequest<HttpRequestDto>
  ): Promise<HttpResponse> {
    if (!httpRequest.body.email) {
      return await new Promise((resolve) =>
        resolve(badRequest(new MissingParamError('email')))
      )
    }

    if (!httpRequest.body.password) {
      return await new Promise((resolve) =>
        resolve(badRequest(new MissingParamError('password')))
      )
    }
  }
}
