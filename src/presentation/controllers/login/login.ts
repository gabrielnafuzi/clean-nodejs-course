import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers'
import { Controller, HttpResponse } from '../../protocols'
import { HttpRequest } from './../../protocols/http'

export class LoginController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return await new Promise((resolve) =>
      resolve(badRequest(new MissingParamError('email')))
    )
  }
}
