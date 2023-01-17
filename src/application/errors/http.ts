export class ServerError extends Error {
  constructor(error?: Error) {
    super('Server failed. Try again soon')
    this.name = 'Server failed. Try again soon'
    this.stack = error?.stack
  }
}

export class RequiredFieldError extends Error {
  constructor(fieldName: string) {
    super(`The field ${fieldName} is required`)
    this.name = `The field ${fieldName} is required`
  }
}
