import { ServerError } from '../../errors'
import { HttpResponse } from './../../protocols'

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

export const created = <T = unknown>(data: T): HttpResponse<T> => {
  return {
    statusCode: 201,
    body: data,
  }
}

export const ok = <T = unknown>(data: T): HttpResponse<T> => {
  return {
    statusCode: 200,
    body: data,
  }
}
