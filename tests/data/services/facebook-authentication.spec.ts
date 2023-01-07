import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthentication } from '@/domain/features'

class FacebookAuthenticationService {
  constructor(private readonly loadFacebookUser: loadFacebookUserApi) { }

  async perform(params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    await this.loadFacebookUser.loadUser(params)

    return new AuthenticationError()
  }
}

interface loadFacebookUserApi {
  loadUser: (params: loadFacebookUser.Params) => Promise<loadFacebookUser.Result>
}

namespace loadFacebookUser {
  export type Params = {
    token: string
  }

  export type Result = undefined
}

class LoadFacebookUserSpy implements loadFacebookUserApi {
  token?: string
  result = undefined

  async loadUser(params: loadFacebookUser.Params): Promise<loadFacebookUser.Result> {
    this.token = params.token

    return this.result
  }
}

describe('FacebookAuthenticationService', () => {
  it('should call loadFacebookUserApi with correct params', async () => {
    const loadFacebookUser = new LoadFacebookUserSpy()
    const sut = new FacebookAuthenticationService(loadFacebookUser)

    await sut.perform({ token: 'any_token' })

    expect(loadFacebookUser.token).toBe('any_token')
  })

  it('should return AuthenticationError when loadFacebookUserApi returns undefined', async () => {
    const loadFacebookUser = new LoadFacebookUserSpy()
    loadFacebookUser.result = undefined
    const sut = new FacebookAuthenticationService(loadFacebookUser)

    const authResult = await sut.perform({ token: 'any_token' })

    expect(authResult).toEqual(new AuthenticationError())
  })
})
