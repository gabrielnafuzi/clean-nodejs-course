import { ServerError } from '../../errors'
import { HttpResponse, StatusCode } from './../../protocols'

export const badRequest = (error: Error): HttpResponse<Error> => {
  return {
    statusCode: 400,
    body: error,
  }
}

export const serverError = (error: Error): HttpResponse<Error> => {
  return {
    statusCode: 500,
    body: new ServerError(error.stack),
  }
}

export const ok = <T = unknown>(
  data: T,
  statusCode: StatusCode = 200
): HttpResponse<T> => {
  return {
    statusCode,
    body: data,
  }
}
