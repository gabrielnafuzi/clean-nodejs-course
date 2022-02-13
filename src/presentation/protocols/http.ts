export type StatusCode = 200 | 201 | 400 | 401 | 403 | 404 | 500

export interface HttpResponse<T = unknown> {
  statusCode: StatusCode
  body: T
}

export interface HttpRequest<T = unknown> {
  body?: T
}
