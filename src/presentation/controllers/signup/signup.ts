import { MissingParamError } from '../../erros/missing-param-error'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class SignUpController {
  handle(httpRequest: HttpRequest<any>): HttpResponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new MissingParamError('name'),
      }
    }

    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new MissingParamError('email'),
      }
    }
  }
}
