export class ServerError extends Error {
  constructor(error?: Error) {
    super('Server failed. Try again soon')
    this.name = 'Server failed. Try again soon'
    this.stack = error?.stack
  }
}
