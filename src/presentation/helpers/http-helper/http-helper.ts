import { ServerError } from '../../errors'
import { HttpResponse } from './../../protocols'

export const badRequest = (error: Error): HttpResponse<Error> => {
  return {
    statusCode: 400,
    body: error,
  }
}

export const serverError = (): HttpResponse<Error> => {
  return {
    statusCode: 500,
    body: new ServerError(),
  }
}
