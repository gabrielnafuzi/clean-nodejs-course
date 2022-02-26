export class UnauthorizedError extends Error {
  constructor(stack?: Error['stack']) {
    super('Unauthorized')

    this.name = 'UnauthorizedError'
  }
}
