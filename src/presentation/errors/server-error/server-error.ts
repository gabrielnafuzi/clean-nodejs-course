export class ServerError extends Error {
  constructor(stack?: Error['stack']) {
    super('Internal server error')

    this.name = 'ServerError'
    this.stack = stack
  }
}
