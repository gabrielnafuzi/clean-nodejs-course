import { MissingParamError } from '../../erros/missing-param-error'
import { badRequest } from '../../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../../protocols/http'

interface HttpRequestBody {
  name?: string
  email?: string
  password?: string
  passwordConfirmation?: string
}

export class SignUpController {
  handle(httpRequest: HttpRequest<HttpRequestBody>): HttpResponse<any> {
    const requiredFields = ['name', 'email', 'password']

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
