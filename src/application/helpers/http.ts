import { ServerError, UnauthorizedError } from '../errors'

export type httpResponse<T = any> = {
  statusCode: number
  data: T
}

export const ok = <T= any> (data: T): httpResponse<T> => ({
  statusCode: 200,
  data
})

export const badRequest = (error: Error): httpResponse<Error> => ({
  statusCode: 400,
  data: error
})

export const unauthorized = (): httpResponse<UnauthorizedError> => ({
  statusCode: 401,
  data: new UnauthorizedError()
})

export const serverError = (error: any): httpResponse<ServerError> => ({
  statusCode: 500,
  data: new ServerError(error)
})
